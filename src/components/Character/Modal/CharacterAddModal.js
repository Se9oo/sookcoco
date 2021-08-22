import React, { useState } from 'react';

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
  useDisclosure,
} from '@chakra-ui/react';

import CharacterForm from './CharacterForm';
import CharacterSelectModal from './CharacterSelectModal';

const CharacterAddModal = ({ open, close }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectClass, setSelectClass] = useState('');

  return (
    <>
      <Modal isOpen={open} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center">
              <Image
                w="32px"
                mr="5px"
                src="/sookcoco-logo.png"
                alt="sookcoco-logo"
              />
              캐릭터 추가
            </Flex>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={3}>
            <CharacterForm onOpen={onOpen} selectClass={selectClass} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr="5px">
              추가
            </Button>
            <Button onClick={close}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CharacterSelectModal
        isOpen={isOpen}
        onClose={onClose}
        setSelectClass={setSelectClass}
      />
    </>
  );
};

export default CharacterAddModal;
