import React, { useEffect, useState } from 'react';

import {
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import CharacterForm from './CharacterForm';
import CharacterSelectModal from './CharacterSelectModal';

const CharacterAddModal = ({
  open,
  close,
  setCharacterList,
  mode = '',
  characterInfo,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectClass, setSelectClass] = useState(
    mode === 'update' && characterInfo ? characterInfo.selectClass : ''
  );

  // modal이 다시 열리면 selectClass 초기화
  useEffect(() => {
    if (selectClass && mode === '') {
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
              <Image w="32px" mr="5px" src="/sookcoco-logo-mini.png" alt="" />
              캐릭터 {mode === 'update' ? '수정 / 삭제' : '추가'}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={3}>
            <CharacterForm
              onOpen={onOpen}
              selectClass={selectClass}
              characterInfo={characterInfo}
              setCharacterList={setCharacterList}
              mode={mode}
              close={close}
            />
          </ModalBody>
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
