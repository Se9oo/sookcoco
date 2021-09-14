import React from 'react';

import {
  Flex,
  Image,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
} from '@chakra-ui/react';

import { characters } from '../../../common/common';
import ClassList from './ClassList';

const CharacterSelectModal = ({ isOpen, onClose, setSelectClass }) => {
  const gridTemplates = useBreakpointValue({
    xxs: 'repeat(2, 1fr)',
    xs: 'repeat(2, 1fr)',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
    lg: 'repeat(4, 1fr)',
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex alignItems="center">
            <Image w="32px" mr="5px" src="/sookcoco-logo-mini.png" alt="" />
            클래스 선택
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={gridTemplates} gap="10px">
            <ClassList
              characters={characters}
              onClose={onClose}
              setSelectClass={setSelectClass}
            />
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CharacterSelectModal;
