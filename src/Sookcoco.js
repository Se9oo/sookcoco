import React, { useEffect, useState } from 'react';

import { ChakraProvider, Box } from '@chakra-ui/react';

import { theme } from './common/theme';
import Fonts from './common/fonts';

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

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('sookcoco'));

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
          <Schedule selectCharacter={selectCharacter} schedule={schedule} />
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Sookcoco;
