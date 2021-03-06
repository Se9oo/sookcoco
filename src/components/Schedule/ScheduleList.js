import React from 'react';

import { Box, Center, Flex, Grid, Text } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';

import ScheduleCard from './ScheduleCard';
import { Image } from '@chakra-ui/image';

const ScheduleList = ({ selectCharacter, schedule, mode }) => {
  const templates = useBreakpointValue({
    xxs: '1fr',
    xs: '1fr',
    sm: '1fr',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(3, 1fr)',
  });

  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
  });

  const infoMessage = '캐릭터를 선택하고\n스케줄을 추가해 주세요!';
  const checkedSchedule =
    schedule !== undefined
      ? schedule.filter((sch) => sch.checked === true)
      : [];

  return (
    <>
      {checkedSchedule.length !== 0 ? (
        <Grid templateColumns={templates} gap="10px">
          {checkedSchedule.map((item) => {
            return (
              <ScheduleCard
                key={item.key}
                item={item}
                selectCharacter={selectCharacter}
                mode={mode}
              />
            );
          })}
        </Grid>
      ) : (
        <Box h="100%" borderRadius="lg" p="8%" bgColor="gray.50">
          <Center>
            <Flex alignItems="center">
              <Image
                w="24px"
                mr="3px"
                src="/sookcoco-logo-mini.png"
                alt="logo"
              />
              <Text
                fontSize={size}
                align="center"
                pt="3px"
                color={'rgba(0,0,0,0.4)'}
              >
                {infoMessage.split('\n').map((message, idx) => {
                  return (
                    <React.Fragment key={idx}>
                      {message}
                      <br />
                    </React.Fragment>
                  );
                })}
              </Text>
            </Flex>
          </Center>
        </Box>
      )}
    </>
  );
};

export default ScheduleList;
