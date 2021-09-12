import React, { useEffect, useState } from 'react';

import {
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import ScheduleSettingTabs from './ScheduleSettingTabs';

const ScheduleSettingModal = ({ open, close, characterKey, setSchedule }) => {
  // 일일, 주간, 원정대 체크한 컨텐츠
  const [checkedList, setCheckedList] = useState({
    daily: [],
    weekly: [],
    expedition: [],
  });

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
  const onClickScheduleItems = (key, isChecked, schedule, mode) => {
    if (!checkedList[`${mode}`]) {
      return;
    }

    const idx = checkedList[`${mode}`].findIndex((list) => list.key === key);

    const newCheckedList = { ...checkedList };

    if (isChecked) {
      if (idx === -1) {
        schedule.checked = true;
        newCheckedList[`${mode}`].push(schedule);
        setCheckedList(newCheckedList);
      }
    } else {
      if (idx >= 0) {
        schedule.checked = false;
        newCheckedList[`${mode}`].splice(idx, 1);
        setCheckedList(newCheckedList);
      }
    }
  };

  // 컨텐츠 저장
  const onClickSaveBtn = () => {
    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    origin.characters.map((character) => {
      if (character.characterKey === characterKey) {
        character['schedule'] = checkedList;
      }
    });

    window.localStorage.setItem('sookcoco', JSON.stringify(origin));

    setSchedule(checkedList);
    // modal close
    close();
  };

  return (
    <Modal isOpen={open} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex>
            <Image
              w="32px"
              mr="5px"
              src="/sookcoco-logo.png"
              alt="sookcoco-logo"
            />
            스케줄 설정
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pl="10px" pr="10px">
          <ScheduleSettingTabs
            checkedList={checkedList}
            onClickScheduleItems={onClickScheduleItems}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr="5px" onClick={onClickSaveBtn}>
            저장
          </Button>
          <Button onClick={close}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleSettingModal;
