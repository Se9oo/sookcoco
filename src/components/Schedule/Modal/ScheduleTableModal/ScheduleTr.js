import React from 'react';

import { Avatar } from '@chakra-ui/avatar';
import { Flex, Text } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';
import { useBreakpointValue } from '@chakra-ui/media-query';

import ScheduleTd from './ScheduleTd';

const ScheduleTr = ({ schedule }) => {
  const isDisplay = useBreakpointValue({
    xxs: 'none',
    xs: 'none',
    sm: 'none',
    md: 'block',
    lg: 'block',
  });

  return (
    <Tr>
      <Td>
        <Flex flexDir="column" justifyContent="center" alignItems="center">
          <Avatar
            size="sm"
            src={schedule[0].src}
            name={schedule[0].name}
            bg="transparent"
            mb="5px"
          />
          <Text display={isDisplay}>{schedule[0].name}</Text>
        </Flex>
      </Td>
      {schedule.map((sch, idx) => {
        return <ScheduleTd key={`${schedule[0].key}_${idx}`} schedule={sch} />;
      })}
    </Tr>
  );
};

export default ScheduleTr;
