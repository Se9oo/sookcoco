import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Image,
  Heading,
  useBreakpointValue,
} from '@chakra-ui/react';

import ScheduleTableTabs from './ScheduleTableTabs';

const ScheduleTableModal = ({ open, close }) => {
  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  const scrollSize = useBreakpointValue({
    xxs: '7px',
    xs: '7px',
    sm: '7px',
    md: '10px',
    lg: '10px',
  });

  return (
    <>
      <Modal size="6xl" isOpen={open} onClose={close} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="center">
              <Image
                w="32px"
                mr="5px"
                src="/sookcoco-logo-mini.png"
                alt="logo"
              />
              <Heading as="h2" size={size}>
                전체 스케줄 현황
              </Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody
            pl="10px"
            pr="10px"
            overflow="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: `${scrollSize}`,
                height: `${scrollSize}`,
                borderRadius: '99px',
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
          >
            <ScheduleTableTabs />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ScheduleTableModal;
