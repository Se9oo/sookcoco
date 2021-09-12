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
