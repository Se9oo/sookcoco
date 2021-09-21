import React, { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';
import { WarningTwoIcon, InfoOutlineIcon } from '@chakra-ui/icons';

const Alert = ({
  isOpen,
  setIsOpen,
  title,
  message = '',
  buttonText = '닫기',
  buttonActionText = '확인',
  onClickAction,
  kind,
}) => {
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <Flex alignItems="center">
              <Image w="32px" mr="5px" src="/sookcoco-logo-mini.png" alt="" />
              <Text pt="5px">{title}</Text>
            </Flex>
          </AlertDialogHeader>

          <AlertDialogBody>
            <Flex alignItems="center">
              {/* {kind === 'Error' ? (
                <WarningTwoIcon mr="5px" mb="5px" color="red" />
              ) : (
                <InfoOutlineIcon mr="5px" mb="5px" color="blue.300" />
              )} */}
              {message.split('\n').map((msg) => {
                return (
                  <>
                    {msg}
                    <br />
                  </>
                );
              })}
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} mr="5px">
              {buttonText}
            </Button>
            <Button bg="red.500" color="white" onClick={onClickAction}>
              {buttonActionText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
