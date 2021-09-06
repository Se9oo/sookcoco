import React, { useCallback, useEffect, useState } from 'react';

import { Button, Flex, Input, useBreakpointValue } from '@chakra-ui/react';

import { schedule } from '../../../common/common';

import ScheduleItems from './ScheduleItems';

const ScheduleSettingForm = ({ mode, checkedList, onClickScheduleItems }) => {
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
  const [customContent, setCustomContent] = useState('');
  const onChangeCustomConetent = (e) => {
    setCustomContent(e.target.value);
  };

  // 초기 컨텐츠 리스트 세팅
  useEffect(() => {
    let customItems = [];

    if (checkedList.length > 0) {
      customItems = checkedList.filter((checked) =>
        checked.hasOwnProperty('custom')
      );

      if (customItems.length > 0) {
        setCustomList(customItems);
      }
    }

    const deepCopySchedule = JSON.parse(JSON.stringify(schedule[`${mode}`]));

    // 고정 컨텐츠 리스트
    const scheduleList =
      customItems.length === 0
        ? deepCopySchedule
        : [...deepCopySchedule, ...customItems];

    const checkedKeyList = checkedList.map((checked) => checked.key);

    scheduleList.map((sch) => {
      if (checkedKeyList.includes(sch.key)) {
        sch.checked = true;
      }
    });

    setContentList(scheduleList);
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
      // 최종 컨텐츠 set에서도 제거
      onClickScheduleItems(key, false, {}, mode);
    },
    [contentList, customList, onClickScheduleItems, mode]
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
        {contentList.map((content) => {
          return (
            <ScheduleItems
              key={content.key}
              schedule={content}
              onClickDeleteContent={onClickDeleteContent}
              onClickScheduleItems={onClickScheduleItems}
              mode={mode}
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
