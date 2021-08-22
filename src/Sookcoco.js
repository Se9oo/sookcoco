import React from 'react';

import { ChakraProvider, Box } from '@chakra-ui/react';

import { theme } from './common/theme';
import Fonts from './common/fonts';

import Header from './components/Header';
import CharacterList from './components/Character/CharacterList';
import Schedule from './components/Schedule';

const Sookcoco = () => {
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
          <CharacterList />
          <Schedule />
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Sookcoco;
