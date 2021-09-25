import React, { useCallback, useEffect, useState } from 'react';

import {
  Button,
  Flex,
  Divider,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useBreakpointValue,
} from '@chakra-ui/react';

import { schedule } from '../../../common/common';

import ScheduleItems from './ScheduleItems';

const ScheduleSettingForm = ({ mode, checkedList, onClickScheduleItems }) => {
  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  const headingSize = useBreakpointValue({
    xxs: 'xs',
    xs: 'xs',
    sm: 'sm',
    md: 'sm',
    lg: 'sm',
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
  // 추가하는 커스텀 컨텐츠 횟수
  const [customContentTimes, setCustomContentTimes] = useState(1);
  const onChangeCustomContentTimes = (val) => {
    setCustomContentTimes(val);
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
      done: 0,
      checkCount: customContentTimes,
      repeat: mode,
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
        h="65%"
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
      <Divider mb="10px" />
      <Heading as="h3" size={headingSize} mb="5px">
        커스텀 컨텐츠 추가
      </Heading>
      <Flex w="100%" flexDirection="column" justifyContent="center">
        <Flex justifyContent="space-between" alignItems="center" mb="5px">
          <Input
            w="70%"
            mr="5px"
            size={size}
            variant="flushed"
            placeholder="추가할 컨텐츠를 입력하세요."
            focusBorderColor="green.500"
            value={customContent}
            onChange={onChangeCustomConetent}
          />
          <NumberInput
            w="30%"
            size={size}
            defaultValue={1}
            min={1}
            max={99}
            focusBorderColor="green.500"
            value={customContentTimes}
            onChange={onChangeCustomContentTimes}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
        <Button w="100%" size={size} onClick={onClickAddContent}>
          추가
        </Button>
      </Flex>
    </>
  );
};

export default ScheduleSettingForm;
