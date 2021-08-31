import React from 'react';

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

const ScheduleSettingModal = ({ open, close }) => {
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
          <ScheduleSettingTabs />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr="5px">
            저장
          </Button>
          <Button onClick={close}>취소</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleSettingModal;
