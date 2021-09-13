import React, { useEffect, useState } from 'react';

import { ChakraProvider, Box, Divider } from '@chakra-ui/react';

import { theme } from './common/theme';
import Fonts from './common/fonts';
import { schedule as commonSchedule } from './common/common';

import Header from './components/Header';
import CharacterList from './components/Character/CharacterList';
import Schedule from './components/Schedule';

const Sookcoco = () => {
  const [selectCharacter, setSelectCharacter] = useState(-1);
  const [schedule, setSchedule] = useState({
    daily: [],
    weekly: [],
    expedition: [],
  });

  // localStorage 스케줄 관련
  useEffect(() => {
    const now = new Date();
    const year = String(now.getFullYear());
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();

    month = month >= 10 ? month : '0' + month;
    date = date >= 10 ? date : '0' + date;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;

    const today = year + month + date + hour + minute;

    let lastConnect = JSON.parse(window.localStorage.getItem('lastConnect'));

    if (!lastConnect) {
      lastConnect = today;
    }

    // 매일 06시
    const standard = year + month + date + '0600';

    //
    if (parseInt(lastConnect) <= parseInt(standard)) {
      const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

      if (origin) {
        origin.characters.map((character) => {
          if (character.hasOwnProperty('schedule')) {
            schedule.daily.length > 0 &&
              schedule.daily.map((day) => {
                day.done = 0;
              });

            if (now.getDay() === 3) {
              schedule.weekly.length > 0 &&
                schedule.weekly.map((week) => {
                  week.done = 0;
                });
            }
          }
        });

        if (now.getDay() === 3 && origin.expedition.length > 0) {
          origin.expedition.map((exp) => {
            exp.done = 0;
          });
        }

        window.localStorage.setItem('sookcoco', JSON.stringify(origin));
        window.localStorage.setItem('lastConnect', JSON.stringify(today));
      }
    }
  }, []);

  // 화면 진입시
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('sookcoco'));

    // 캐릭터 선택시 선택한 스케줄 불러오기
    if (selectCharacter > -1 && data) {
      const idx = data.characters.findIndex(
        (character) => character.characterKey === selectCharacter
      );

      if (idx > -1) {
        setSchedule(data.characters[idx].schedule);
      } else {
        setSchedule({ daily: [], weekly: [], expedition: [] });
      }
    }

    //  sookcoco key가 없다면 기초 데이터 생성
    if (!data) {
      const basicData = {
        characters: [],
        expedition: commonSchedule.expedition,
      };

      window.localStorage.setItem('sookcoco', JSON.stringify(basicData));
    } else {
      // 원정대 스케줄 없는 경우 공통 원정대 정보 추가
      if (!data.hasOwnProperty('expedition')) {
        data.expedition = commonSchedule.expedition;
        window.localStorage.setItem('sookcoco', JSON.stringify(data));
      }
    }
  }, [selectCharacter]);

  return (
    <>
      <ChakraProvider theme={theme} resetCSS>
        <Fonts />
        <Box
          bg="grey.100"
          w={['100%', '100%', '90%', '85%', '85%']}
          maxW="1000px"
          h="100vh"
          m="0 auto"
          p="5px"
        >
          <Header />
          <CharacterList
            selectCharacter={selectCharacter}
            setSelectCharacter={setSelectCharacter}
            setSchedule={setSchedule}
          />
          <Divider m="10px 0" />
          <Schedule selectCharacter={selectCharacter} schedule={schedule} />
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Sookcoco;
