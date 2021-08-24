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
import Alert from '../../Alert';

const CharacterAddModal = ({ open, close, setCharacterList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [server, onChangeServer] = useInput('');
  const [selectClass, setSelectClass] = useState('');
  const [name, onChangeName] = useInput('');
  const [level, onChangeLevel] = useInput('');
  const [itemLevel, onChangeItemLevel] = useInput('');

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertKind, setAlertKind] = useState('');

  // modal이 다시 열리면 selectClass 초기화
  useEffect(() => {
    if (selectClass) {
      setSelectClass('');
    }
  }, [open]);

  // 캐릭터 추가
  const onClickAddBtn = () => {
    if (!server || !selectClass || !name || !level || !itemLevel) {
      setAlertMsg('입력 값을 확인해주세요!');
      setAlertKind('Error');
      setAlertOpen(true);
      return;
    }

    const data = { server, selectClass, name, level, itemLevel };

    if (!window.localStorage.getItem('sookcoco')) {
      const userObj = {
        characters: [data],
      };

      window.localStorage.setItem('sookcoco', JSON.stringify(userObj));
      setCharacterList([data]);
    } else {
      const obj = JSON.parse(window.localStorage.getItem('sookcoco'));

      if (obj !== null && obj.hasOwnProperty('characters')) {
        obj.characters.push(data);
      } else {
        obj.characters = [{ data }];
      }

      window.localStorage.setItem('sookcoco', JSON.stringify(obj));
      setCharacterList([...obj.characters]);
    }

    close();
  };

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
            <Button colorScheme="green" mr="5px" onClick={onClickAddBtn}>
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
      <Alert
        isOpen={alertOpen}
        setIsOpen={setAlertOpen}
        message={alertMsg}
        kind={alertKind}
      />
    </>
  );
};

export default CharacterAddModal;
