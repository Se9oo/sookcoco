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

const CharacterCard = ({
  characterKey,
  name,
  selectClass,
  server,
  level,
  itemLevel,
  selectCharacter,
  setCharacterList,
  setSelectCharacter,
}) => {
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

  const fontColor = selectCharacter === characterKey ? 'white' : 'black';

  const src = getClassInfoByKor(selectClass)[0]['src'];
  const serverKor = getServerKor(server);

  // 캐릭터 수정,삭제 모달 제어
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickCharacterCard = () => {
    setSelectCharacter(characterKey);
  };

  return (
    <Flex
      w="100%"
      p="10px"
      alignItems="center"
      borderRadius="xl"
      bg={
        selectCharacter === characterKey ? 'rgba(148, 216, 45, 1)' : 'gray.50'
      }
      cursor="pointer"
      flexDirection={direction}
      onClick={onClickCharacterCard}
    >
      <Avatar size={size} name={name} src={src} m="10px" />
      <Flex flexDirection="column" alignItems={align} flexWrap="wrap">
        <Text fontSize={size} color={fontColor}>
          {name}
        </Text>
        <Flex flexWrap="wrap">
          <Center mr="5px" mb="3px">
            <Badge bg="white">{selectClass}</Badge>
          </Center>
          <Center mr="5px" mb="3px">
            <Badge bg="white">{serverKor}</Badge>
          </Center>
          <Center mr="5px" mb="3px">
            <Badge bg="white">{`Lv.${level}`}</Badge>
          </Center>
          <Center mb="3px">
            <Badge bg="white">{itemLevel}</Badge>
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
          characterKey,
          server,
          name,
          selectClass,
          level,
          itemLevel,
        }}
        setCharacterList={setCharacterList}
      />
    </Flex>
  );
};

export default CharacterCard;
