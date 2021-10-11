import React, { useEffect, useState } from 'react';

import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';

import { schedule as commonSchedule } from '../../../../common/common';
import { deepCopyObj, getClassInfoByKor } from '../../../../common/util';
import ScheduleTr from './ScheduleTr';
import ScheduleTh from './ScheduleTh';

const ScheduleTable = ({ mode }) => {
  const [characterList, setCharacterList] = useState([]);
  const [scheduleTableData, setScheduleTableData] = useState([]);

  useEffect(() => {
    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    const thData = [];
    const tdData = [];

    origin.characters.map((character) => {
      // create th data
      const classInfo = getClassInfoByKor(character.selectClass);

      const characterInfo = {
        key: character.characterKey,
        src: classInfo[0].src,
        name: character.name,
      };
      thData.push(characterInfo);
    });

    const deepCopySchedule = deepCopyObj(commonSchedule);
    const deepCopyUserExpedition = deepCopyObj(origin.expedition);

    // create td data
    let userExpArr = [];
    let commonScheduleArr = [];

    // mode가 원정대인 경우 원정대 - 일일 제외
    if (mode === 'expedition') {
      deepCopyUserExpedition.map((exp) => {
        if (exp.repeat !== 'daily' && !exp.custom) {
          exp.type = 'expedition';
          userExpArr.push(exp);
        }
      });

      commonScheduleArr = [...userExpArr];
    } else {
      // mode가 일일인 경우 원정대 - 일일 추가
      if (mode === 'daily') {
        deepCopyUserExpedition.map((exp) => {
          if (exp.repeat === 'daily' && !exp.custom) {
            exp.type = 'expedition';
            userExpArr.push(exp);
          }
        });
      }

      commonScheduleArr = [...deepCopySchedule[`${mode}`], ...userExpArr];
    }

    commonScheduleArr.map((schedule) => {
      const isCharacterDoneArr = [];
      isCharacterDoneArr.push(schedule);

      origin.characters.map((character) => {
        if (schedule.type === 'expedition') {
          schedule.done === schedule.checkCount
            ? isCharacterDoneArr.push('y')
            : isCharacterDoneArr.push('n');
        } else if (character.hasOwnProperty('schedule')) {
          const schIdx = character.schedule[`${mode}`].findIndex(
            (sch) => sch.key === schedule.key
          );

          if (schIdx > -1) {
            const schData = character.schedule[`${mode}`][schIdx];

            schData.done === schData.checkCount
              ? isCharacterDoneArr.push('y')
              : isCharacterDoneArr.push('n');
          } else {
            isCharacterDoneArr.push('n');
          }
        } else {
          isCharacterDoneArr.push('n');
        }
      });

      tdData.push(isCharacterDoneArr);
    });

    setCharacterList(thData);
    setScheduleTableData(tdData);
  }, []);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th></Th>
          {characterList.map((character) => {
            return <ScheduleTh key={character.key} character={character} />;
          })}
        </Tr>
      </Thead>
      <Tbody>
        {scheduleTableData.length > 0
          ? scheduleTableData.map((schedule) => {
              return <ScheduleTr key={schedule[0].key} schedule={schedule} />;
            })
          : null}
      </Tbody>
    </Table>
  );
};

export default ScheduleTable;
