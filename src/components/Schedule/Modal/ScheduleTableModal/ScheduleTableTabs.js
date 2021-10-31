import React from 'react';

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
} from '@chakra-ui/react';

import ScheduleTable from './ScheduleTable';

const ScheduleTableTabs = () => {
  const mode = ['daily', 'weekly', 'expedition'];

  const tabSize = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  return (
    <Tabs
      defaultIndex={1} // 주간 컨텐츠가 default
      colorScheme="green"
      isFitted
      variant="enclosed"
      bg="white"
      size={tabSize}
    >
      <TabList borderBottom="none">
        <Tab
          bg="gray.50"
          _selected={{ color: 'white', bg: 'lime' }}
          _focus={{ outline: 'none' }}
        >
          일일
        </Tab>
        <Tab
          bg="gray.50"
          _selected={{ color: 'white', bg: 'lime' }}
          _focus={{ outline: 'none' }}
        >
          주간
        </Tab>
        <Tab
          bg="gray.50"
          _selected={{ color: 'white', bg: 'lime' }}
          _focus={{ outline: 'none' }}
        >
          원정대
        </Tab>
      </TabList>
      <TabPanels h="100%">
        {mode.map((md) => {
          return (
            <TabPanel key={md} p="10px 0 0 0">
              <ScheduleTable mode={md} />
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default ScheduleTableTabs;
