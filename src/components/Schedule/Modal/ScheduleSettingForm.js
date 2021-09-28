import React, { useCallback, useEffect, useState } from 'react';

import {
  Button,
  Flex,
  Divider,
  Heading,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useBreakpointValue,
} from '@chakra-ui/react';

import { schedule } from '../../../common/common';

import ScheduleItems from './ScheduleItems';
import useInput from '../../../hooks/useInput';

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
  // 컨텐츠 리스트
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
  // 원정대 커스텀 컨텐츠 초기화 주기
  const [customInitialCycle, onChangeCustomInitialCycle] = useInput(
    mode === 'daily' || mode === 'expedition' ? 'daily' : 'weekly'
  );

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

    // 컨텐츠 리스트
    let scheduleList = [];
    if (mode !== 'expedition') {
      // 일일, 주간 컨텐츠는 캐릭터별 저장된 데이터를 기반으로 리스트 세팅
      scheduleList =
        customItems.length === 0
          ? deepCopySchedule
          : [...deepCopySchedule, ...customItems];
    } else {
      // 원정대 컨텐츠는 localStorage에 저장된 데이터를 기반으로 리스트 세팅
      const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

      scheduleList = origin.expedition;
    }

    const checkedKeyList = checkedList.map((checked) => {
      if (checked.checked) {
        return checked.key;
      }
    });

    scheduleList.map((sch) => {
      if (checkedKeyList.includes(sch.key)) {
        sch.checked = true;
      }
    });

    setContentList(scheduleList);
  }, [checkedList]);

  // 커스텀 컨텐츠 추가
  const onClickAddContent = () => {
    if (customContent === '' || !customContent) return;

    const max = customList.length === 0 ? 0 : customList.length;

    const data = {
      key: `custom${max}`,
      kor: customContent,
      custom: 'y',
      done: 0,
      checkCount: customContentTimes,
      repeat: customInitialCycle,
    };

    const list = [...contentList, data];
    const customContentList = [...customList, data];

    setCustomContent('');
    setContentList(list);
    setCustomList(customContentList);
    onClickScheduleItems(data.key, false, data, mode, 'add');
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
      onClickScheduleItems(key, false, {}, mode, 'delete');
    },
    [contentList, customList, onClickScheduleItems, mode]
  );

  return (
    <>
      <Flex
        w="100%"
        h="60%"
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
        <Input
          w="100%"
          mb="5px"
          size={size}
          variant="flushed"
          placeholder="추가할 컨텐츠를 입력하세요."
          focusBorderColor="green.500"
          value={customContent}
          onChange={onChangeCustomConetent}
        />
        <Flex justifyContent="space-between" alignItems="center" mb="5px">
          <NumberInput
            w="100%"
            mr="5px"
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
          <Select
            size={size}
            focusBorderColor="green.500"
            value={customInitialCycle}
            onChange={onChangeCustomInitialCycle}
          >
            {(mode === 'daily' || mode === 'expedition') && (
              <option value="daily">일일</option>
            )}
            {(mode === 'weekly' || mode === 'expedition') && (
              <option value="weekly">주간</option>
            )}
          </Select>
        </Flex>
        <Button w="100%" size={size} onClick={onClickAddContent}>
          추가
        </Button>
      </Flex>
    </>
  );
};

export default ScheduleSettingForm;
