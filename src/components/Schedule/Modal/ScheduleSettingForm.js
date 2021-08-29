import React from 'react';

import { Checkbox, Grid } from '@chakra-ui/react';

import { schedule } from '../../../common/common';

const ScheduleSettingForm = ({ mode }) => {
  let data = [];

  switch (mode) {
    case 'daily':
      data = schedule.daily;
      break;
    case 'weekly':
      data = schedule.weekly;
      break;
    case 'expedition':
      data = schedule.expedition;
      break;
    default:
      data = [];
      break;
  }

  return (
    <Grid w="100%" templateColumns="1fr">
      <Checkbox />
      {data.map((schedule) => {
        return schedule.kor;
      })}
    </Grid>
  );
};

export default ScheduleSettingForm;
