import React from 'react';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Heading,
  Box,
  Image,
  Flex,
  Center,
  Text,
} from '@chakra-ui/react';
import { useBreakpointValue } from '@chakra-ui/media-query';

import ScheduleList from './ScheduleList';

const Schedule = ({ selectCharacter, schedule }) => {
  const mode = ['daily', 'weekly', 'expedition'];

  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'lg',
    lg: 'lg',
  });

  const headingSize = useBreakpointValue({
    xxs: 'xs',
    xs: 'xs',
    sm: 'md',
  });

  return (
    <>
      <Heading p="5px" mb="10px" as="h2" size={headingSize}>
        스케줄
      </Heading>
      <Tabs isFitted variant="enclosed" bg="white" p="5px">
        <TabList borderBottom="none" mb="3px">
          <Tab
            bg="gray.50"
            borderRight="1px solid #e5e5e5"
            _selected={{ color: 'white', bg: 'lime' }}
            _focus={{ outline: 'none' }}
            fontSize={size}
          >
            일일
          </Tab>
          <Tab
            bg="gray.50"
            borderRight="1px solid #e5e5e5"
            _selected={{ color: 'white', bg: 'lime' }}
            _focus={{ outline: 'none' }}
            fontSize={size}
          >
            주간
          </Tab>
          <Tab
            bg="gray.50"
            _selected={{ color: 'white', bg: 'lime' }}
            _focus={{ outline: 'none' }}
            fontSize={size}
          >
            원정대
          </Tab>
        </TabList>
        <TabPanels
          h="50vh"
          overflow="auto"
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
              borderRadius: '99px',
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
          }}
        >
          {schedule && selectCharacter > -1 ? (
            mode.map((md) => {
              return (
                <TabPanel key={`${md}`} p="10px 0">
                  <ScheduleList
                    selectCharacter={selectCharacter}
                    schedule={schedule[`${md}`]}
                    mode={md}
                  />
                </TabPanel>
              );
            })
          ) : (
            <Box h="100%" borderRadius="lg" p="8%" bgColor="gray.50">
              <Center>
                <Flex alignItems="center">
                  <Image
                    w={'24px'}
                    mr="3px"
                    src="/sookcoco-logo.png"
                    alt="sookcoco-logo"
                  />
                  <Text pt="3px" color={'rgba(0,0,0,0.4)'}>
                    스케줄을 추가해주세요
                  </Text>
                </Flex>
              </Center>
            </Box>
          )}
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Schedule;
