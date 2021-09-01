import React, { useCallback, useEffect, useState } from 'react';

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

  // 사용자가 추가한 커스텀 컨텐츠 리스트
  const [customList, setCustomList] = useState([]);
  // 고정 컨텐츠 리스트
  const [contentList, setContentList] = useState([]);
  // 추가하는 컨텐츠 info state
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

  // 커스텀 컨텐츠 추가
  const onClickAddContent = () => {
    if (customContent === '' || !customContent) return;

    const indexArr = customList.map((item) => item.idx);
    const max = indexArr.length === 0 ? 0 : Math.max(...indexArr) + 1;

    const data = {
      key: `custom${max}`,
      kor: customContent,
      custom: 'y',
      idx: max,
    };

    const list = [...contentList, data];
    const customContentList = [...customList, data];

    setCustomContent('');
    setContentList(list);
    setCustomList(customContentList);
  };

  // 커스텀 컨텐츠 삭제
  const onClickDeleteContent = useCallback(
    (key) => () => {
      const deleteIdx = contentList.findIndex((content) => content.key === key);
      const deleteCustomIdx = customList.findIndex(
        (custom) => custom.key === key
      );

      const list = [...contentList];
      list.splice(deleteIdx, 1);

      const customContentList = [...customList];
      customContentList.splice(deleteCustomIdx, 1);

      setContentList(list);
      setCustomList(customContentList);
    },
    [contentList, customList]
  );

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
          return (
            <ScheduleItems
              key={schedule.key}
              schedule={schedule}
              onClickDeleteContent={onClickDeleteContent}
            />
          );
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
