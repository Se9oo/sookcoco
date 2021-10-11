import React from 'react';

import { Th } from '@chakra-ui/table';
import { Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';

const ScheduleTh = ({ character }) => {
  return (
    <Th p="10px 5px">
      <Flex flexDir="column" justifyContent="center" alignItems="center">
        <Avatar src={character.src} alt={character.name} mb="5px" />
        <Text
          width="50px"
          fontSize="sm"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {character.name}
        </Text>
      </Flex>
    </Th>
  );
};

export default ScheduleTh;
