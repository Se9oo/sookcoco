import React from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

const Schedule = () => {
  return (
    <Tabs isFitted variant="enclosed" bg="white">
      <TabList>
        <Tab>일일</Tab>
        <Tab>주간</Tab>
        <Tab>원정대</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>일일!</TabPanel>
        <TabPanel>주간!</TabPanel>
        <TabPanel>원정대!</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Schedule;
