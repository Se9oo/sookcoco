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

const Alert = ({
  isOpen,
  setIsOpen,
  title,
  message = '',
  buttonText = '닫기',
  buttonActionText = '확인',
  onClickAction,
  alertMode,
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
              {message.split('\n').map((msg, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {msg}
                    <br />
                  </React.Fragment>
                );
              })}
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={alertMode === 'load' ? onClickAction : onClose}
              mr={buttonActionText !== '' ? '5px' : '0'}
            >
              {buttonText}
            </Button>
            {buttonActionText !== '' ? (
              <Button
                bg={alertMode === 'clear' ? 'red.500' : 'blue.500'}
                color="white"
                onClick={onClickAction}
              >
                {buttonActionText}
              </Button>
            ) : null}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
