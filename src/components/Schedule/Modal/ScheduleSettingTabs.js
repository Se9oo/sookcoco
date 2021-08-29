import React from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import ScheduleSettingForm from './ScheduleSettingForm';

const ScheduleSettingTabs = () => {
  const mode = ['daily', 'weekly', 'expedition'];

  return (
    <Tabs h="65vh" colorScheme="green" isFitted variant="enclosed" bg="white">
      <TabList>
        <Tab>일일</Tab>
        <Tab>주간</Tab>
        <Tab>원정대</Tab>
      </TabList>
      <TabPanels>
        {mode.map((md) => {
          return (
            <TabPanel key={md}>
              <ScheduleSettingForm mode={md} />
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default ScheduleSettingTabs;
