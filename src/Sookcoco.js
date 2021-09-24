import React, { useEffect, useState } from 'react';

import { ChakraProvider, Box, Divider } from '@chakra-ui/react';

import dayjs from 'dayjs';

import { theme } from './common/theme';
import Fonts from './common/fonts';
import { schedule as commonSchedule } from './common/common';

import Header from './components/Header';
import CharacterList from './components/Character/CharacterList';
import Schedule from './components/Schedule';

const Sookcoco = () => {
  const [selectCharacter, setSelectCharacter] = useState(-1);
  const [schedule, setSchedule] = useState({});

  // localStorage 스케줄 관련
  useEffect(() => {
    let origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    const now = dayjs().format('YYYYMMDDHHmm');
    // 로요일과 차이
    const diffDate = 3 - dayjs(now).day();
    let refreshDate;
    let refreshWeek;

    // sookcoco key가 없다면 기초 데이터 생성
    if (!origin) {
      origin = {};
      origin.characters = [];
      origin.expedition = commonSchedule.expedition;
      origin.refreshDate = dayjs(now).add(1, 'day').format('YYYYMMDD0600');

      if (diffDate > 0) {
        origin.refreshWeek = dayjs(now)
          .add(diffDate, 'day')
          .format('YYYYMMDD0600');
      } else {
        origin.refreshWeek = dayjs(now)
          .add(diffDate, 'day')
          .add(1, 'week')
          .format('YYYYMMDD0600');
      }
    } else {
      // 원정대 스케줄 없는 경우 공통 원정대 정보 추가
      if (!origin.hasOwnProperty('expedition')) {
        origin.expedition = commonSchedule.expedition;
        window.localStorage.setItem('sookcoco', JSON.stringify(origin));
      } else {
        // 공통 원정대 컨텐츠가 추가 제거될 경우 update 로직
        // 커스텀 컨텐츠를 제외한 공통 원정대 컨텐츠
        const orgExpExceptCustom = origin.expedition.filter(
          (exp) => exp.custom !== 'y'
        );

        if (orgExpExceptCustom.length !== commonSchedule.expedition.length) {
          const customExpContent = origin.expedition.filter(
            (exp) => exp.custom === 'y'
          );

          if (customExpContent.length === 0) {
            origin.expedition = commonSchedule.expedition;
          } else {
            origin.expedition = [
              ...commonSchedule.expedition,
              ...customExpContent,
            ];
          }
          window.localStorage.setItem('sookcoco', JSON.stringify(origin));
        }
      }

      // 일일 컨텐츠 초기화 날짜 세팅
      refreshDate = origin.refreshDate;
      refreshWeek = origin.refreshWeek;

      // 일일 스케줄 초기화
      if (parseInt(now) >= parseInt(refreshDate)) {
        origin.characters.map((character) => {
          if (character.hasOwnProperty('schedule')) {
            character.schedule.daily.length > 0 &&
              character.schedule.daily.map((day) => {
                day.done = 0;
              });
          }
        });

        // 원정대-일일 스케줄 초기화
        if (origin.expedition.length > 0) {
          origin.expedition.map((exp) => {
            if (exp.repeat === 'daily') {
              exp.done = 0;
            }
          });
        }

        origin.refreshDate = dayjs(now).add(1, 'day').format('YYYYMMDD0600');
      }

      // 주간, 원정대 스케줄 초기화
      if (parseInt(now) >= parseInt(refreshWeek)) {
        origin.characters.map((character) => {
          if (character.hasOwnProperty('schedule')) {
            character.schedule.weekly.length > 0 &&
              character.schedule.weekly.map((week) => {
                week.done = 0;
              });
          }
        });

        // 원정대-주간 스케줄 초기화
        if (origin.hasOwnProperty('expedition')) {
          if (origin.expedition.length > 0) {
            origin.expedition.map((exp) => {
              if (exp.repeat === 'week') {
                exp.done = 0;
              }
            });
          }
        }

        if (diffDate > 0) {
          origin.refreshWeek = dayjs(now)
            .add(diffDate, 'day')
            .format('YYYYMMDD0600');
        } else {
          origin.refreshWeek = dayjs(now)
            .add(diffDate, 'day')
            .add(1, 'week')
            .format('YYYYMMDD0600');
        }
      }
    }

    window.localStorage.setItem('sookcoco', JSON.stringify(origin));
  }, []);

  // 캐릭터 선택시
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('sookcoco'));

    // 캐릭터 선택시 선택한 스케줄 불러오기
    if (selectCharacter > -1 && data) {
      const idx = data.characters.findIndex(
        (character) => character.characterKey === selectCharacter
      );

      if (idx > -1) {
        if (data.characters[idx].hasOwnProperty('schedule')) {
          const scheduleData = data.characters[idx].schedule;

          setSchedule(scheduleData);
        } else {
          setSchedule({
            daily: [],
            weekly: [],
            expedition: [],
          });
        }
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
