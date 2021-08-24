import React, { useEffect, useState } from 'react';

import {
  Flex,
  Heading,
  Button,
  Spacer,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

import CharacterCard from './CharacterCard';
import CharacterAddModal from './Modal/CharacterAddModal';

const CharacterList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [characterList, setCharacterList] = useState([]);

  const size = useBreakpointValue({
    xxs: 'xs',
    xs: 'xs',
    sm: 'md',
  });

  useEffect(() => {
    const obj = JSON.parse(window.localStorage.getItem('sookcoco'));
    if (obj !== null && obj.hasOwnProperty('characters')) {
      setCharacterList(obj.characters);
    }
  }, [characterList.join()]);

  return (
    <>
      <Flex alignItems="center" p="5px" mb="10px">
        <Heading as="h2" size={size}>
          캐릭터 목록
        </Heading>
        <Spacer />
        <Button
          colorScheme="green"
          boxShadow="sm"
          size={size}
          fontSize={size}
          onClick={onOpen}
        >
          캐릭터 추가
        </Button>
      </Flex>
      <Flex
        w="100%"
        h="20%"
        p="5px"
        flexDirection="column"
        overflow="auto"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
            borderRadius: '99px',
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `rgba(0, 0, 0, 0.05)`,
          },
        }}
        mb="20px"
      >
        {characterList.map((character, idx) => {
          const { name, server, level, itemLevel, selectClass } = character;

          return (
            <CharacterCard
              key={`${name}_${idx}`}
              name={name}
              server={server}
              level={level}
              itemLevel={itemLevel}
              selectClass={selectClass}
            />
          );
        })}
        <CharacterAddModal
          open={isOpen}
          close={onClose}
          setCharacterList={setCharacterList}
        />
      </Flex>
    </>
  );
};

export default CharacterList;
