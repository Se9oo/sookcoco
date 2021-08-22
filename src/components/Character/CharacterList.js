import React from 'react';

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

  const size = useBreakpointValue({
    xxs: 'xs',
    xs: 'xs',
    sm: 'md',
  });

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
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterAddModal open={isOpen} close={onClose} />
      </Flex>
    </>
  );
};

export default CharacterList;
