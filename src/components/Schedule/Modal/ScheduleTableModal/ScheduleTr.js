import React from 'react';

import { Avatar } from '@chakra-ui/avatar';
import { Flex, Text } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';

import ScheduleTd from './ScheduleTd';

const ScheduleTr = ({ schedule }) => {
  return (
    <Tr>
      <Td>
        <Flex flexDir="column" justifyContent="center" alignItems="center">
          <Avatar
            size="sm"
            src={schedule[0].src}
            name={schedule[0].key}
            bg="transparent"
            mb="5px"
          />
          <Text>{schedule[0].kor}</Text>
        </Flex>
      </Td>
      {schedule.map((sch, idx) => {
        return <ScheduleTd key={`${schedule[0].key}_${idx}`} schedule={sch} />;
      })}
    </Tr>
  );
};

export default ScheduleTr;
