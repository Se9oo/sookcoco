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

import { schedule as commonSchedule } from '../../../common/common';

import useInput from '../../../hooks/useInput';
import CharacterForm from './CharacterForm';
import CharacterSelectModal from './CharacterSelectModal';
import Alert from '../../Alert';

const CharacterAddModal = ({
  open,
  close,
  setCharacterList,
  mode = '',
  characterInfo,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [server, onChangeServer] = useInput(
    mode === 'update' && characterInfo ? characterInfo.server : ''
  );
  const [selectClass, setSelectClass] = useState(
    mode === 'update' && characterInfo ? characterInfo.selectClass : ''
  );
  const [name, onChangeName] = useInput(
    mode === 'update' && characterInfo ? characterInfo.name : ''
  );
  const [level, onChangeLevel] = useInput(
    mode === 'update' && characterInfo ? characterInfo.level : ''
  );
  const [itemLevel, onChangeItemLevel] = useInput(
    mode === 'update' && characterInfo ? characterInfo.itemLevel : ''
  );

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertKind, setAlertKind] = useState('');

  // modal이 다시 열리면 selectClass 초기화
  useEffect(() => {
    if (selectClass && mode === '') {
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
    // 키 값 default
    data.characterKey = 0;

    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    // sookcoco key가 존재하지 않으면 (첫 캐릭터 생성시)
    if (!origin) {
      const userObj = {
        characters: [data],
        expedition: commonSchedule.expedition,
      };

      userObj.characters[0].characterKey = 0;

      window.localStorage.setItem('sookcoco', JSON.stringify(userObj));
      setCharacterList([data]);
    } else {
      if (origin !== null && origin.hasOwnProperty('characters')) {
        data.characterKey = origin.characters.length;
        origin.characters.push(data);
      } else {
        origin.characters = [{ data }];
      }

      window.localStorage.setItem('sookcoco', JSON.stringify(origin));
      setCharacterList([...origin.characters]);
    }

    close();
  };

  // 캐릭터 수정
  const onClickUpdateBtn = () => {
    if (!server || !selectClass || !name || !level || !itemLevel) {
      setAlertMsg('입력 값을 확인해주세요!');
      setAlertKind('Error');
      setAlertOpen(true);
      return;
    }

    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    const updateStorage = origin.characters.map((data) => {
      if (data.characterKey === characterInfo.characterKey) {
        data.name = name;
        data.level = level;
        data.itemLevel = itemLevel;
      }
      return data;
    });

    origin.characters = updateStorage;

    window.localStorage.setItem('sookcoco', JSON.stringify(origin));

    setCharacterList([...updateStorage]);

    close();
  };

  // 캐릭터 삭제
  const onClickDeleteBtn = () => {
    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    const deleteIdx = origin.characters.findIndex(
      (data) => data.characterKey === characterInfo.characterKey
    );

    origin.characters.splice(deleteIdx, 1);

    window.localStorage.setItem('sookcoco', JSON.stringify(origin));

    setCharacterList([...origin.characters]);

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
              캐릭터 {mode === 'update' ? '수정 / 삭제' : '추가'}
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
              characterInfo={characterInfo}
              mode={mode}
            />
          </ModalBody>

          <ModalFooter>
            {mode === 'update' ? (
              <>
                <Button colorScheme="red" mr="5px" onClick={onClickDeleteBtn}>
                  삭제
                </Button>
                <Button colorScheme="green" mr="5px" onClick={onClickUpdateBtn}>
                  수정
                </Button>
              </>
            ) : (
              <Button colorScheme="green" mr="5px" onClick={onClickAddBtn}>
                추가
              </Button>
            )}
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
