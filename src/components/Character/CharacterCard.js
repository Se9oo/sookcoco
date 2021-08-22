import React from 'react';

import { characters } from '../../common/characters';

import {
  Spacer,
  Flex,
  Center,
  Avatar,
  Badge,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

const CharacterCard = () => {
  const avatarSize = useBreakpointValue({
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
        size={avatarSize}
        name={characters.magician.sorceress.name}
        src={characters.magician.sorceress.src}
        mr="10px"
      />
      <Flex flexDirection="column">
        <strong>소서리스</strong>
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
