import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/react';

const ClassList = ({ characters, onClose, setSelectClass }) => {
  const onClickClass = (kor) => () => {
    setSelectClass(kor);
    onClose();
  };
  return (
    <>
      {characters.map((character) => {
        return character.map((c) => {
          return (
            <Box
              key={c.eng}
              borderWidth="1px"
              borderRadius="lg"
              p="5px"
              cursor="pointer"
              _hover={{ bg: 'gray.100' }}
              onClick={onClickClass(c.kor)}
            >
              <Flex flexDirection="column" alignItems="center" p="5px">
                <Avatar src={c.src} mb="5px" />
                <Text isTruncated>{c.kor}</Text>
              </Flex>
            </Box>
          );
        });
      })}
    </>
  );
};

export default ClassList;
