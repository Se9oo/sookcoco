import React from 'react';

import {
  Spacer,
  Flex,
  Center,
  Avatar,
  Badge,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';

import { getClassInfoByKor, getServerKor } from '../../common/util';
import CharacterAddModal from './Modal/CharacterAddModal';

const CharacterCard = ({ name, selectClass, server, level, itemLevel }) => {
  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'lg',
  });

  const margin = useBreakpointValue({
    xxs: 0,
    xs: 0,
    sm: 0,
    md: '5px',
    lg: '5px',
  });

  const direction = useBreakpointValue({
    xxs: 'row',
    xs: 'row',
    sm: 'row',
    md: 'column',
    lg: 'column',
  });

  const align = useBreakpointValue({
    xxs: 'none',
    xs: 'none',
    sm: 'none',
    md: 'center',
    lg: 'center',
  });

  const src = getClassInfoByKor(selectClass)[0]['src'];
  const serverKor = getServerKor(server);

  // 캐릭터 수정,삭제 모달 제어
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      w="100%"
      p="10px"
      alignItems="center"
      borderRadius="xl"
      bg="white"
      boxShadow="sm"
      cursor="pointer"
      flexDirection={direction}
    >
      <Avatar size={size} name={name} src={src} mr="10px" />
      <Flex flexDirection="column" alignItems={align} flexWrap="wrap">
        <Text fontSize={size}>{name}</Text>
        <Flex flexWrap="wrap">
          <Center mr="5px" mb="3px">
            <Badge>{selectClass}</Badge>
          </Center>
          <Center mr="5px" mb="3px">
            <Badge>{serverKor}</Badge>
          </Center>
          <Center mr="5px" mb="3px">
            <Badge>{`Lv.${level}`}</Badge>
          </Center>
          <Center mb="3px">
            <Badge>{itemLevel}</Badge>
          </Center>
        </Flex>
      </Flex>
      <Spacer />
      <SettingsIcon
        w="15px"
        cursor="pointer"
        zIndex="999"
        mt={margin}
        _hover={{ color: 'green' }}
        _active={{ color: 'green.300' }}
        onClick={onOpen}
      />
      <CharacterAddModal
        open={isOpen}
        close={onClose}
        mode="update"
        characterInfo={{
          server,
          name,
          selectClass,
          level,
          itemLevel,
        }}
      />
    </Flex>
  );
};

export default CharacterCard;
