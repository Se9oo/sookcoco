import React from 'react';

import { Box, Image, useBreakpointValue } from '@chakra-ui/react';

const Header = () => {
  const size = useBreakpointValue({
    xxs: '32px',
    xs: '32px',
    sm: '32px',
    md: '48px',
    lg: '48px',
  });

  return (
    <Box w="100%" pt="5px" pb="5px" mb="2">
      <Box w={size} m="0 auto">
        <Image src="/sookcoco-logo.png" alt="sookcoco-logo" />
      </Box>
    </Box>
  );
};

export default Header;
