import React from 'react';

import { Td } from '@chakra-ui/table';
import { Avatar } from '@chakra-ui/avatar';

const ScheduleTd = ({ schedule }) => {
  return (
    <>
      {schedule === 'y' ? (
        <Td textAlign="center">
          <Avatar
            size="sm"
            src="/sookcoco-logo-mini.png"
            name="sookcoco"
            bg="transparent"
          />
        </Td>
      ) : schedule === 'n' ? (
        <Td textAlign="center"></Td>
      ) : null}
    </>
  );
};

export default ScheduleTd;
