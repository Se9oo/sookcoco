import React from 'react';

import { Grid } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';

import ScheduleCard from './ScheduleCard';

const ScheduleList = ({ schedule }) => {
  const templates = useBreakpointValue({
    xxs: '1fr',
    xs: '1fr',
    sm: '1fr',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(3, 1fr)',
  });

  return (
    <Grid templateColumns={templates} gap="10px">
      {schedule.map((item) => {
        return <ScheduleCard key={item.key} item={item} />;
      })}
    </Grid>
  );
};

export default ScheduleList;
