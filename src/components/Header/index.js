import React from 'react';

import { Box, Image } from '@chakra-ui/react';

const width = ['32px', '48px', '48px', '50px', '50px'];

const Header = () => {
  return (
    <Box w="100%" pt="5px" pb="5px" mb="2">
      <Box w={width} m="0 auto">
        <Image src="/sookcoco-logo.png" alt="sookcoco-logo" />
      </Box>
    </Box>
  );
};

export default Header;
