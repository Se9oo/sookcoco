import React, { useState } from 'react';

import {
  Button,
  Input,
  Box,
  useBreakpointValue,
  Heading,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';

import {
  CopyIcon,
  RepeatClockIcon,
  DeleteIcon,
  RepeatIcon,
} from '@chakra-ui/icons';

import { encrypt, decrypt } from '../../common/crypto';
import useInput from '../../hooks/useInput';
import { schedule as commonSchedule } from '../../common/common';

import Alert from '../Alert';
import DataManageHelp from './DataManageHelp';

function checkStorageData(data) {
  if (!data || typeof data !== 'object') {
    return false;
  }

  if (
    data.hasOwnProperty('characters') &&
    data.hasOwnProperty('expedition') &&
    data.hasOwnProperty('refreshDate') &&
    data.hasOwnProperty('refreshWeek')
  ) {
    return true;
  } else {
    return false;
  }
}

const DataManage = ({ isOpen, onClose }) => {
  const DrawerDirection = useBreakpointValue({
    xxs: 'top',
    xs: 'top',
    sm: 'top',
    md: 'right',
    lg: 'right',
  });

  const fontSize = useBreakpointValue({
    xxs: 'md',
    xs: 'md',
    sm: 'lg',
  });

  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'md',
  });

  const headingSize = useBreakpointValue({
    xxs: 'xs',
    xs: 'xs',
    sm: 'sm',
    md: 'sm',
    lg: 'sm',
  });

  // message
  const backUpDataMessage = '클립보드 복사 완료';
  const loadDataMessage =
    '데이터 불러오기 완료\n닫기를 누르면 페이지가 새로고침 됩니다.';
  const loadDataFailMessage = '데이터 불러오기 실패';
  const clearDataMessage =
    '초기화 된 데이터는 복구 할 수 없습니다.\n초기화 하시겠습니까?';
  const updateContentMessage =
    '컨텐츠를 최신 정보로 반영합니다.\n업데이트를 누르면 페이지가 새로고침 됩니다.';

  // alert state
  const [alertMode, setAlertMode] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onAlertOpen = (mode) => {
    setAlertMode(mode);
    setIsAlertOpen(true);
  };

  // input state
  const [dataInput, onChangeDataInput] = useInput('');

  // 데이터 백업
  const onClickDataBackUp = () => {
    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));
    const encryptData = encrypt(origin);
    navigator.clipboard.writeText(encryptData);

    onAlertOpen('backUp');
  };

  // 데이터 불러오기
  const onClickDataLoad = () => {
    const decryptData = decrypt(dataInput);

    if (
      !dataInput ||
      decryptData === 'error' ||
      !checkStorageData(decryptData)
    ) {
      onAlertOpen('error');
    } else {
      window.localStorage.setItem('sookcoco', JSON.stringify(decryptData));
      onAlertOpen('load');
    }
  };

  // 데이터 불러오기 action
  const onClickDataLoadAction = () => {
    setIsAlertOpen(false);

    window.location.reload();
  };

  // 데이터 초기화
  const onClickInitialize = () => {
    window.localStorage.removeItem('sookcoco');

    window.location.reload();
  };

  // 컨텐츠 업데이트
  const onClickUpdateContent = () => {
    setIsAlertOpen(false);

    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));
    const deepCopySchedule = JSON.parse(JSON.stringify(commonSchedule));

    // 기존 스케줄 업데이트
    origin.characters.map((character) => {
      if (character.hasOwnProperty('schedule')) {
        const schedules = ['daily', 'weekly', 'expedition'];

        schedules.map((x) => {
          const newDataArr = [];

          // 스케줄 업데이트시 컨텐츠 체크 상태 동기화
          deepCopySchedule[`${x}`].map((commonSch) => {
            character.schedule[`${x}`].map((sch) => {
              if (sch.key === commonSch.key) {
                commonSch.checked = sch.checked;

                newDataArr.push(commonSch);
              }
            });
          });

          // custom 스케줄 컨텐츠 (수행횟수 초기화)
          const customScheduleArr = character.schedule[`${x}`].filter(
            (sch) => sch.custom === 'y'
          );

          if (customScheduleArr.length > 0) {
            customScheduleArr.map((sch) => {
              sch.done = 0;
            });

            character.schedule[`${x}`] = [...newDataArr, ...customScheduleArr];
          } else {
            character.schedule[`${x}`] = newDataArr;
          }
        });
      }
    });

    // 공통 원정대 컨텐츠 업데이트
    const newExpeditionArr = [];
    commonSchedule.expedition.map((commonSch) => {
      if (
        origin.expedition.findIndex((sch) => sch.key === commonSch.key) > -1
      ) {
        newExpeditionArr.push(commonSch);
      }
    });

    const customExpeditionArr = origin.expedition.filter(
      (sch) => sch.custom === 'y'
    );

    if (customExpeditionArr.length > 0) {
      customExpeditionArr.map((sch) => (sch.done = 0));

      origin.expedition = [...newExpeditionArr, ...customExpeditionArr];
    } else {
      origin.expedition = newExpeditionArr;
    }

    window.localStorage.setItem('sookcoco', JSON.stringify(origin));

    window.location.reload();
  };

  return (
    <>
      <Drawer placement={DrawerDirection} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            fontSize={fontSize}
            mb="10px"
            borderBottom="1px solid #e5e5e5"
          >
            데이터 관리
          </DrawerHeader>
          <DrawerBody>
            <Box mb="10px">
              <Input
                w="100%"
                mb="10px"
                fontSize="sm"
                focusBorderColor="green.500"
                placeholder="복사된 데이터를 여기에 붙여 넣어주세요!"
                onChange={onChangeDataInput}
              />
              <Button
                w="100%"
                size={size}
                mb="10px"
                leftIcon={<CopyIcon />}
                bg="lime"
                color="white"
                onClick={onClickDataBackUp}
              >
                데이터 백업
              </Button>
              <Button
                w="100%"
                size={size}
                mb="10px"
                leftIcon={<RepeatClockIcon />}
                bg="green.500"
                color="white"
                onClick={onClickDataLoad}
              >
                데이터 불러오기
              </Button>
              <Button
                w="100%"
                size={size}
                mb="10px"
                leftIcon={<RepeatIcon />}
                bg="blue.500"
                color="white"
                onClick={() => onAlertOpen('update')}
              >
                컨텐츠 업데이트
              </Button>
              <Button
                w="100%"
                size={size}
                mb="10px"
                leftIcon={<DeleteIcon />}
                bg="red.500"
                color="white"
                onClick={() => onAlertOpen('clear')}
              >
                데이터 초기화
              </Button>
            </Box>
            <Heading as="h3" size={headingSize} mb="10px">
              도움말
            </Heading>
            <DataManageHelp />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Alert
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        title={
          alertMode === 'clear'
            ? '데이터 초기화'
            : alertMode === 'backUp'
            ? '데이터 백업'
            : alertMode === 'update'
            ? '컨텐츠 업데이트'
            : '데이터 불러오기'
        }
        message={
          alertMode === 'clear'
            ? clearDataMessage
            : alertMode === 'backUp'
            ? backUpDataMessage
            : alertMode === 'error'
            ? loadDataFailMessage
            : alertMode === 'update'
            ? updateContentMessage
            : loadDataMessage
        }
        buttonActionText={
          alertMode === 'clear'
            ? '초기화'
            : alertMode === 'update'
            ? '업데이트'
            : ''
        }
        onClickAction={
          alertMode === 'load'
            ? onClickDataLoadAction
            : alertMode === 'clear'
            ? onClickInitialize
            : alertMode === 'update'
            ? onClickUpdateContent
            : null
        }
        alertMode={alertMode}
      />
    </>
  );
};

export default DataManage;
