import React, { useEffect, useState } from 'react';

import {
  Button,
  Flex,
  Grid,
  Input,
  useBreakpointValue,
} from '@chakra-ui/react';

import { schedule } from '../../../common/common';

import ScheduleItems from './ScheduleItems';

const ScheduleSettingForm = ({ mode }) => {
  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'lg',
  });

  const [contentList, setContentList] = useState([]);
  const [customContent, setCustomContent] = useState();
  const onChangeCustomConetent = (e) => {
    setCustomContent(e.target.value);
  };

  useEffect(() => {
    switch (mode) {
      case 'daily':
        setContentList(schedule.daily);
        break;
      case 'weekly':
        setContentList(schedule.weekly);
        break;
      case 'expedition':
        setContentList(schedule.expedition);
        break;
      default:
        break;
    }
  }, []);

  const onClickAddContent = () => {
    if (customContent === '' || !customContent) return;

    const list = [...contentList];
    list.push({ key: 'random', kor: customContent });

    setCustomContent('');
    setContentList(list);
  };

  return (
    <>
      <Flex
        w="100%"
        h="80%"
        flexDirection="column"
        mb="10px"
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
      >
        {contentList.map((schedule) => {
          return <ScheduleItems key={schedule.key} schedule={schedule} />;
        })}
      </Flex>
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <Input
          w="75%"
          size={size}
          variant="flushed"
          placeholder="추가할 컨텐츠를 입력하세요."
          focusBorderColor="green.500"
          value={customContent}
          onChange={onChangeCustomConetent}
        />
        <Button w="20%" size={size} onClick={onClickAddContent}>
          추가
        </Button>
      </Flex>
    </>
  );
};

export default ScheduleSettingForm;
