import React, { useEffect, useState } from 'react';

import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';

import { schedule as commonSchedule } from '../../../../common/common';
import { deepCopyObj, getClassInfoByKor } from '../../../../common/util';

import ScheduleTh from './ScheduleTh';
import ScheduleTr from './ScheduleTr';

const ScheduleTable = ({ mode }) => {
  const [scheduleList, setScheduleList] = useState([]);
  const [tdScheduleData, setTdScheduleData] = useState([]);

  useEffect(() => {
    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    const deepCopySchedule = deepCopyObj(commonSchedule);
    const deepCopyUserExpedition = deepCopyObj(origin.expedition);

    let thData = [];
    let tdData = [];

    // th schedule data setting
    if (mode === 'daily' || mode === 'weekly') {
      thData = [...deepCopySchedule[`${mode}`]];
    }

    if (mode === 'daily') {
      deepCopyUserExpedition.map((userExp) => {
        if (userExp.repeat === 'daily' && !userExp.custom) {
          userExp.type = 'expedition';
          thData.push(userExp);
        }
      });
    } else if (mode === 'expedition') {
      deepCopyUserExpedition.map((userExp) => {
        if (userExp.repeat !== 'daily' && !userExp.custom) {
          userExp.type = 'expedition';
          thData.push(userExp);
        }
      });
    }

    setScheduleList(thData);

    // td data setting
    origin.characters.map((character) => {
      const characterScheduleData = [];
      const classInfo = getClassInfoByKor(character.selectClass);

      const characterInfo = {
        key: character.characterKey,
        src: classInfo[0].src,
        name: character.name,
      };

      characterScheduleData.push(characterInfo);

      thData.map((schedule) => {
        if (schedule.type === 'expedition') {
          schedule.done === schedule.checkCount
            ? characterScheduleData.push('y')
            : characterScheduleData.push('n');
        } else if (character.hasOwnProperty('schedule')) {
          const schIdx = character.schedule[`${mode}`].findIndex(
            (sch) => sch.key === schedule.key
          );

          if (schIdx > -1) {
            const schData = character.schedule[`${mode}`][schIdx];

            schData.done === schData.checkCount
              ? characterScheduleData.push('y')
              : characterScheduleData.push('n');
          } else {
            characterScheduleData.push('n');
          }
        } else {
          characterScheduleData.push('n');
        }
      });

      tdData.push(characterScheduleData);
    });

    setTdScheduleData(tdData);
  }, []);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th w="15%"></Th>
          {scheduleList.length > 0
            ? scheduleList.map((schedule) => {
                return <ScheduleTh key={schedule.key} schedule={schedule} />;
              })
            : null}
        </Tr>
      </Thead>
      <Tbody>
        {tdScheduleData.length > 0
          ? tdScheduleData.map((tdSchedule) => {
              return (
                <ScheduleTr key={tdSchedule[0].key} schedule={tdSchedule} />
              );
            })
          : null}
      </Tbody>
    </Table>
  );
};

export default ScheduleTable;
