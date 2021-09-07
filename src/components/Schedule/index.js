import React from 'react';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ScheduleList from './ScheduleList';

const Schedule = ({ schedule }) => {
  const mode = ['daily', 'weekly', 'expedition'];

  return (
    <Tabs
      h="55vh"
      isFitted
      variant="enclosed"
      bg="white"
      colorScheme="green"
      boxShadow="sm"
    >
      <TabList>
        <Tab>일일</Tab>
        <Tab>주간</Tab>
        <Tab>원정대</Tab>
      </TabList>
      <TabPanels>
        {schedule &&
          mode.map((md) => {
            return (
              <TabPanel key={`${md}`}>
                <ScheduleList schedule={schedule[`${md}`]} />
              </TabPanel>
            );
          })}
        ;
      </TabPanels>
    </Tabs>
  );
};

export default Schedule;
