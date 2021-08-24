import React from 'react';

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

import { getClassInfoByKor, getServerKor } from '../../common/util';

const CharacterCard = ({ name, selectClass, server, level, itemLevel }) => {
  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'lg',
  });

  const src = getClassInfoByKor(selectClass)[0]['src'];
  const serverKor = getServerKor(server);

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
      <Avatar size={size} name={name} src={src} mr="10px" />
      <Flex flexDirection="column">
        <Text fontSize={size}>{name}</Text>
        <Flex>
          <Center mr="10px">
            <Badge>{selectClass}</Badge>
          </Center>
          <Center mr="10px">
            <Badge>{serverKor}</Badge>
          </Center>
          <Center mr="10px">
            <Badge>{`Lv.${level}`}</Badge>
          </Center>
          <Center mr="10px">
            <Badge>{itemLevel}</Badge>
          </Center>
        </Flex>
      </Flex>
      <Spacer />
      <SettingsIcon width="15px" cursor="pointer" zIndex="999" />
    </Flex>
  );
};

export default CharacterCard;
