import React, { useEffect, useState } from 'react';

import {
  Button,
  Flex,
  Image,
  Heading,
  useBreakpointValue,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { deepCopyObj } from '../../../common/util';

import ScheduleSettingTabs from './ScheduleSettingTabs';
import Alert from '../../Alert';

const ScheduleSettingModal = ({ open, close, characterKey, setSchedule }) => {
  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  // message
  const successMessage = '최근 스케줄 불러오기 성공';
  const failureMessage = '최근 설정된 스케줄이 없습니다.';

  // 일일, 주간, 원정대 체크한 컨텐츠
  const [checkedList, setCheckedList] = useState({
    daily: [],
    weekly: [],
    expedition: [],
  });

  const [alertMode, setAlertMode] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onAlertOpen = (mode) => {
    setAlertMode(mode);
    setIsAlertOpen(true);
  };

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('sookcoco'));

    if (data) {
      const idx = data.characters.findIndex(
        (character) => character.characterKey === characterKey
      );

      if (idx === -1) {
        setCheckedList({ daily: [], weekly: [], expedition: [] });
        return;
      }

      // 로컬스토리지에 데이터가 있는 경우 불러옴
      if (data.characters[idx].hasOwnProperty('schedule')) {
        setCheckedList(data.characters[idx].schedule);
      } else {
        setCheckedList({ daily: [], weekly: [], expedition: [] });
      }
    }
  }, [characterKey, open]);

  // 컨텐츠 체크박스 체크 change event
  const onClickScheduleItems = (key, isChecked, schedule, mode, action) => {
    if (!checkedList[`${mode}`]) {
      return;
    }

    const idx = checkedList[`${mode}`].findIndex((list) => list.key === key);

    const newCheckedList = { ...checkedList };

    if (action === 'add' || action === 'check') {
      schedule.checked = action === 'add' ? false : isChecked;

      idx === -1
        ? newCheckedList[`${mode}`].push(schedule)
        : (newCheckedList[`${mode}`][idx] = schedule);
    } else if (action === 'delete') {
      schedule.checked = false;
      newCheckedList[`${mode}`].splice(idx, 1);
    }

    setCheckedList(newCheckedList);
  };

  // 컨텐츠 저장
  const onClickSaveBtn = () => {
    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    const customExpContent = checkedList.expedition.filter(
      (exp) => exp.custom === 'y'
    );

    const copyCustomExpContent = deepCopyObj(customExpContent);

    origin.characters.map((character) => {
      if (character.characterKey === characterKey) {
        character['schedule'] = checkedList;
      } else {
        // 다른 캐릭터들 원정대 스케줄 저장
        if (character.hasOwnProperty('schedule')) {
          const orgExpWithoutCustom = character.schedule.expedition.filter(
            (exp) => exp.custom !== 'y'
          );

          // 원정대 커스텀 컨텐츠가 있는 경우
          if (copyCustomExpContent.length > 0) {
            // 다른 캐릭터에 추가하는 원정대 커스텀 컨텐츠가 있는지 체크 후
            // 없다면 checked 상태를 false로 세팅하고 schedule에 추가
            copyCustomExpContent.map((customExp) => {
              const expIdx = character.schedule.expedition.findIndex(
                (exp) => exp.key === customExp.key
              );

              expIdx === -1
                ? (customExp.checked = false)
                : (customExp.checked =
                    character.schedule.expedition[expIdx].checked);
            });

            character.schedule.expedition = [
              ...orgExpWithoutCustom,
              ...copyCustomExpContent,
            ];
          } else {
            character.schedule.expedition = orgExpWithoutCustom;
          }
        }
      }
    });

    // 공통 원정대 컨텐츠에 저장
    const commonExpWithoutCustom = origin.expedition.filter(
      (exp) => exp.custom !== 'y'
    );

    if (customExpContent.length > 0) {
      copyCustomExpContent.map((customExp) => (customExp.checked = false));

      origin.expedition = [...commonExpWithoutCustom, ...copyCustomExpContent];
    } else {
      origin.expedition = commonExpWithoutCustom;
    }

    // 최근 저장한 스케줄 localStorage 저장 로직
    const deepCopyCheckedList = deepCopyObj(checkedList);

    const schedules = ['daily', 'weekly', 'expedition'];

    // 수행 횟수 초기화
    schedules.map((sch) => {
      deepCopyCheckedList[`${sch}`].map((checked) => {
        checked.done = 0;
      });
    });

    origin.recentSchedule = deepCopyCheckedList;

    window.localStorage.setItem('sookcoco', JSON.stringify(origin));

    setSchedule(checkedList);
    // modal close
    close();
  };

  // 최근 스케줄 불러오기
  const onClickRecentSchedule = () => {
    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    if (origin.hasOwnProperty('recentSchedule')) {
      onAlertOpen('success');
      setCheckedList(origin.recentSchedule);
    } else {
      onAlertOpen('failure');
    }
  };

  return (
    <>
      <Modal isOpen={open} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center">
              <Image w="32px" mr="5px" src="/sookcoco-logo-mini.png" alt="" />
              <Heading as="h2" size={size}>
                스케줄 설정
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pl="10px" pr="10px">
            <ScheduleSettingTabs
              checkedList={checkedList}
              onClickScheduleItems={onClickScheduleItems}
            />
          </ModalBody>

          <ModalFooter justifyContent="space-between" alignItems="center">
            <Button
              bg="lime"
              color="white"
              size={size}
              mr="5px"
              onClick={onClickRecentSchedule}
            >
              최근 스케줄 불러오기
            </Button>
            <Flex>
              <Button
                colorScheme="green"
                size={size}
                mr="5px"
                onClick={onClickSaveBtn}
              >
                저장
              </Button>
              <Button size={size} onClick={close}>
                취소
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Alert
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        title="스케줄 불러오기"
        message={alertMode === 'success' ? successMessage : failureMessage}
        buttonActionText=""
      />
    </>
  );
};

export default ScheduleSettingModal;
