import React, { useState } from 'react';

import {
  Button,
  Input,
  Box,
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';

import { CopyIcon, RepeatClockIcon, DeleteIcon } from '@chakra-ui/icons';

import Alert from '../Alert';
import { encrypt, decrypt } from '../../common/crypto';
import useInput from '../../hooks/useInput';

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

  // message
  const backUpDataMessage = '클립보드 복사 완료';
  const loadDataMessage =
    '데이터 불러오기 완료\n닫기를 누르면 페이지가 새로고침 됩니다.';
  const loadDataFailMessage = '데이터 불러오기 실패';
  const clearDataMessage =
    '초기화 된 데이터는 복구 할 수 없습니다.\n초기화 하시겠습니까?';

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
            <Box>
              <Input w="100%" mb="10px" onChange={onChangeDataInput} />
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
                leftIcon={<DeleteIcon />}
                bg="red.500"
                color="white"
                onClick={() => onAlertOpen('clear')}
              >
                데이터 초기화
              </Button>
            </Box>
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
            : '데이터 불러오기'
        }
        message={
          alertMode === 'clear'
            ? clearDataMessage
            : alertMode === 'backUp'
            ? backUpDataMessage
            : alertMode === 'error'
            ? loadDataFailMessage
            : loadDataMessage
        }
        buttonActionText={alertMode === 'clear' ? '초기화' : ''}
        onClickAction={
          alertMode === 'load' ? onClickDataLoadAction : onClickInitialize
        }
        alertMode={alertMode}
      />
    </>
  );
};

export default DataManage;
