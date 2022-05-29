import React, { useEffect, useState } from 'react';

import { ChakraProvider, Box, Divider } from '@chakra-ui/react';

import { theme } from './common/theme';
import Fonts from './common/fonts';
import { helpMessage } from './common/messages';

import Header from './components/Header';
import CharacterList from './components/Character/CharacterList';
import Schedule from './components/Schedule';
import Alert from './components/Alert';

import { initSookcoco, setSookcocoRefreshData } from './logic/main';

const Sookcoco = () => {
  const [selectCharacter, setSelectCharacter] = useState(-1);
  const [schedule, setSchedule] = useState({});

  // alert state
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // localStorage 스케줄 관련
  useEffect(() => {
    let origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    // sookcoco key가 없다면 기초 데이터 생성
    if (!origin) {
      // 도움말 alert 노출
      setIsAlertOpen(true);
      // 숙코코 기초 데이터 생성
      initSookcoco(origin);
    } else {
      // 일간/주간 컨텐츠 데이터 초기화
      setSookcocoRefreshData(origin);
    }
  }, []);

  // 캐릭터 선택 이벤트
  const onClickCharacterCard = (characterKey) => () => {
    const data = JSON.parse(window.localStorage.getItem('sookcoco'));

    // 캐릭터 선택시 선택한 스케줄 불러오기
    if (characterKey > -1 && data) {
      const idx = data.characters.findIndex(
        (character) => character.characterKey === characterKey
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

    setSelectCharacter(characterKey);
  };

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
            onClickCharacterCard={onClickCharacterCard}
          />
          <Divider m="10px 0" />
          <Schedule selectCharacter={selectCharacter} schedule={schedule} />
        </Box>
        <Alert
          isOpen={isAlertOpen}
          setIsOpen={setIsAlertOpen}
          title="도움말"
          message={helpMessage}
          buttonActionText=""
        />
      </ChakraProvider>
    </>
  );
};

export default Sookcoco;
