import React from 'react';

import { characters } from '../../common/common';

import {
  Spacer,
  Flex,
  Center,
  Avatar,
  Badge,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

const CharacterCard = () => {
  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'lg',
  });

  return (
    <Flex
      w="100%"
      mb="10px"
      p="10px"
      alignItems="center"
      borderRadius="xl"
      bg="white"
      boxShadow="sm"
      cursor="pointer"
    >
      <Avatar
        size={size}
        name={characters[3][3].kor}
        src={characters[3][3].src}
        mr="10px"
      />
      <Flex flexDirection="column">
        <Text fontSize={size}>소서리스</Text>
        <Flex>
          <Center mr="10px">
            <Badge>아만</Badge>
          </Center>
          <Center mr="10px">
            <Badge>Lv.56</Badge>
          </Center>
          <Center mr="10px">
            <Badge>1425</Badge>
          </Center>
        </Flex>
      </Flex>
      <Spacer />
      <SettingsIcon width="15px" cursor="pointer" zIndex="999" />
    </Flex>
  );
};

export default CharacterCard;
