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
  useDisclosure,
} from '@chakra-ui/react';

import useInput from '../../../hooks/useInput';
import CharacterForm from './CharacterForm';
import CharacterSelectModal from './CharacterSelectModal';

const CharacterAddModal = ({ open, close }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [server, onChangeServer] = useInput('');
  const [selectClass, setSelectClass] = useState('');
  const [name, onChangeName] = useInput('');
  const [level, onChangeLevel] = useInput('');
  const [itemLevel, onChangeItemLevel] = useInput('');

  // modal이 다시 열리면 selectClass 초기화
  useEffect(() => {
    if (selectClass) {
      setSelectClass('');
    }
  }, [open]);

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
            <CharacterForm
              onOpen={onOpen}
              onChangeServer={onChangeServer}
              selectClass={selectClass}
              onChangeName={onChangeName}
              onChangeLevel={onChangeLevel}
              onChangeItemLevel={onChangeItemLevel}
            />
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
