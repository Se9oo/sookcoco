import React from 'react';

import { Th } from '@chakra-ui/table';
import { Flex, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { useBreakpointValue } from '@chakra-ui/media-query';

const ScheduleTh = ({ schedule }) => {
  const fontSize = useBreakpointValue({
    xxs: 'xs',
    xs: 'xs',
    sm: 'xs',
    md: 'sm',
    lg: 'sm',
  });

  const isDisplay = useBreakpointValue({
    xxs: 'none',
    xs: 'none',
    sm: 'none',
    md: 'block',
    lg: 'block',
  });

  return (
    <Th p="10px 5px">
      <Flex flexDir="column" justifyContent="center" alignItems="center">
        <Avatar
          size="sm"
          src={schedule.src}
          alt={schedule.key}
          bg="transparent"
          mb="5px"
        />
        <Text display={isDisplay} fontSize={fontSize}>
          {schedule.kor}
        </Text>
      </Flex>
    </Th>
  );
};

export default ScheduleTh;
