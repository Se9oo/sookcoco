import React from 'react';

import { Flex, Text } from '@chakra-ui/layout';
import { Avatar, Checkbox, useBreakpointValue } from '@chakra-ui/react';

const ScheduleItems = ({ schedule }) => {
  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  return (
    <label>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p="5px 0"
        cursor="pointer"
      >
        <Flex alignItems="center">
          <Avatar
            bg="transparent"
            size={size}
            src={schedule.src ? schedule.src : '/sookcoco-logo.png'}
            mr="10px"
          />
          <Text fontSize={size} css={'ime-mode: active'}>
            {schedule.kor}
          </Text>
        </Flex>
        <Checkbox colorScheme="green" mr="10px" />
      </Flex>
    </label>
  );
};

export default ScheduleItems;
