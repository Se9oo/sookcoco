import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/layout';

import { Checkbox } from '@chakra-ui/checkbox';
import { useBreakpointValue } from '@chakra-ui/media-query';
import { Avatar } from '@chakra-ui/avatar';

const ScheduleCard = ({ item }) => {
  const size = useBreakpointValue({
    xxs: 'xs',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  const direction = useBreakpointValue({
    xxs: 'row',
    xs: 'row',
    sm: 'row',
    md: 'column',
    lg: 'column',
  });

  const makeCheckBox = () => {
    const result = [];
    const length = item.checkCount;

    if (length) {
      for (let i = 0; i < length; i++) {
        result.push(<Checkbox mr="2px" key={`${item.key}_${i}`} />);
      }
    }

    return result;
  };

  const { src, key, kor } = item;

  return (
    <Flex
      flexDirection={direction}
      justifyContent="space-between"
      alignItems="center"
      p="10px"
      borderRadius="xl"
      cursor="pointer"
      bg="gray.50"
    >
      <Flex flexDirection={direction} alignItems="center">
        <Avatar src={src} name={key} size={size} bg="transparent" mr="5px" />
        <Text fontSize={size}>{kor}</Text>
      </Flex>
      <Box pt="2px">{makeCheckBox()}</Box>
    </Flex>
  );
};

export default ScheduleCard;
