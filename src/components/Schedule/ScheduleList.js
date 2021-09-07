import React from 'react';

import { Grid } from '@chakra-ui/layout';

const ScheduleList = ({ schedule }) => {
  return (
    <Grid>
      {schedule.map((item) => {
        return (
          <>
            <span>{item.kor}</span>
            <span>{item.checkCount}</span>
          </>
        );
      })}
    </Grid>
  );
};

export default ScheduleList;
