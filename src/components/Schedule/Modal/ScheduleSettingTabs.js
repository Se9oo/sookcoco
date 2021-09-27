import React from 'react';

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useBreakpointValue,
} from '@chakra-ui/react';

import ScheduleSettingForm from './ScheduleSettingForm';

const ScheduleSettingTabs = ({ checkedList, onClickScheduleItems }) => {
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
      h="65vh"
      colorScheme="green"
      isFitted
      variant="enclosed"
      bg="white"
      size={tabSize}
    >
      <TabList borderBottom="none">
        <Tab
          _selected={{ color: 'white', bg: 'lime' }}
          _focus={{ outline: 'none' }}
          _hover={{ bg: 'gray.100' }}
        >
          일일
        </Tab>
        <Tab
          _selected={{ color: 'white', bg: 'lime' }}
          _focus={{ outline: 'none' }}
          _hover={{ bg: 'gray.100' }}
        >
          주간
        </Tab>
        <Tab
          _selected={{ color: 'white', bg: 'lime' }}
          _focus={{ outline: 'none' }}
          _hover={{ bg: 'gray.100' }}
        >
          원정대
        </Tab>
      </TabList>
      <TabPanels h="100%">
        {mode.map((md) => {
          return (
            <TabPanel key={md} h="100%" p="10px">
              <ScheduleSettingForm
                h="100%"
                mode={md}
                checkedList={checkedList[`${md}`]}
                onClickScheduleItems={onClickScheduleItems}
              />
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default ScheduleSettingTabs;
