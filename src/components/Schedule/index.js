import React from 'react';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Heading,
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

  const tabSize = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  return (
    <>
      <Heading p="5px" mb="10px" as="h2" size={headingSize}>
        스케줄
      </Heading>
      <Tabs
        isFitted
        variant="enclosed"
        bg="white"
        p="5px"
        mb="10px"
        size={tabSize}
      >
        <TabList borderBottom="none" mb="3px">
          <Tab
            bg="gray.50"
            _selected={{ color: 'white', bg: 'lime' }}
            _focus={{ outline: 'none' }}
            fontSize={size}
          >
            일일
          </Tab>
          <Tab
            bg="gray.50"
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
          {mode.map((md) => {
            return (
              <TabPanel key={`${md}`} p="10px 0">
                <ScheduleList
                  selectCharacter={selectCharacter}
                  schedule={schedule !== undefined ? schedule[`${md}`] : []}
                  mode={md}
                />
              </TabPanel>
            );
          })}
          ;
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Schedule;
