import React, { useEffect, useState } from 'react';

import {
  Flex,
  Heading,
  Button,
  Spacer,
  useBreakpointValue,
  useDisclosure,
  Box,
  Center,
  Image,
  Text,
  Grid,
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

  const templates = useBreakpointValue({
    xxs: '1fr',
    xs: '1fr',
    sm: '1fr',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(3, 1fr)',
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
      <Grid
        w="100%"
        h="20vh"
        p="5px"
        templateColumns={
          characterList.length < 3
            ? `repeat(${characterList.length}, 1fr)`
            : templates
        }
        gap="10px"
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
        {characterList.length === 0 ? (
          <Box borderRadius="lg" p="8%" bgColor="white">
            <Center>
              <Flex alignItems="center">
                <Image
                  w={'24px'}
                  mr="3px"
                  src="/sookcoco-logo.png"
                  alt="sookcoco-logo"
                />
                <Text pt="3px" color={'rgba(0,0,0,0.4)'}>
                  캐릭터를 추가해주세요!
                </Text>
              </Flex>
            </Center>
          </Box>
        ) : (
          characterList.map((character, idx) => {
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
          })
        )}
        <CharacterAddModal
          open={isOpen}
          close={onClose}
          setCharacterList={setCharacterList}
        />
      </Grid>
    </>
  );
};

export default CharacterList;
