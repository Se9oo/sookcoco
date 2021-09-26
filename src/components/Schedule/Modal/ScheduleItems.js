import React, { useState } from 'react';

import { Flex, Text } from '@chakra-ui/layout';
import { Avatar, Checkbox, useBreakpointValue } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const ScheduleItems = ({
  schedule,
  onClickDeleteContent,
  onClickScheduleItems,
  mode,
}) => {
  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  const [checked, setChecked] = useState(schedule.checked || false);
  const onChangeChecked = (e) => {
    setChecked(!checked);
    onClickScheduleItems(
      schedule.key,
      e.target.checked,
      schedule,
      mode,
      'check'
    );
  };

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
        <Flex>
          {schedule.hasOwnProperty('custom') ? (
            <DeleteIcon
              color="red.500"
              zIndex="9999"
              cursor="pointer"
              _hover={{ color: 'red.300' }}
              onClick={onClickDeleteContent(schedule.key)}
            />
          ) : null}
          <Checkbox
            colorScheme="green"
            mr="10px"
            ml="10px"
            isChecked={checked}
            onChange={onChangeChecked}
          />
        </Flex>
      </Flex>
    </label>
  );
};

export default ScheduleItems;
