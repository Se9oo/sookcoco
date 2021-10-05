import React from 'react';

import {
  Box,
  Image,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

import styled from 'styled-components';

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
      <StyledHeader>
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
      </StyledHeader>
      <DataManage isOpen={isOpen} onClose={onClose} />
    </>
  );
};

const StyledHeader = styled.header`
  position: relative;
  width: 100%;
  padding: 5px 0;
  margin-bottom: 8px;
`;

export default Header;
