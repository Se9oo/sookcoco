import React from 'react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import ScheduleTable from './ScheduleTable';

const ScheduleTableTabs = () => {
  const mode = ['daily', 'weekly', 'expedition'];

  return (
    <Tabs colorScheme="green" isFitted variant="enclosed" bg="white">
      <TabList borderBottom="none">
        <Tab
          _selected={{ color: 'white', bg: 'lime' }}
          _focus={{ outline: 'none' }}
        >
          일일
        </Tab>
        <Tab
          _selected={{ color: 'white', bg: 'lime' }}
          _focus={{ outline: 'none' }}
        >
          주간
        </Tab>
        <Tab
          _selected={{ color: 'white', bg: 'lime' }}
          _focus={{ outline: 'none' }}
        >
          원정대
        </Tab>
      </TabList>
      <TabPanels h="100%">
        {mode.map((md) => {
          return (
            <TabPanel key={md} p="5px 0 0 0">
              <ScheduleTable mode={md} />
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default ScheduleTableTabs;
