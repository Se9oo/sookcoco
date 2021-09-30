import React from 'react';

import {
  Box,
  Image,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import DataManage from './DataManage';

const Header = () => {
  const size = useBreakpointValue({
    xxs: '32px',
    xs: '32px',
    sm: '32px',
    md: '48px',
    lg: '48px',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position="relative" w="100%" pt="5px" pb="5px" mb="2">
        <Box w={size} m="0 auto">
          <Image src="/sookcoco-logo-mini.png" alt="logo" />
        </Box>
        <Box
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
        >
          <HamburgerIcon
            fontSize="24px"
            position="absolute"
            top="50%"
            right="0"
            transform="translateY(-50%)"
            cursor="pointer"
            onClick={onOpen}
          />
        </Box>
      </Box>
      <DataManage isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
