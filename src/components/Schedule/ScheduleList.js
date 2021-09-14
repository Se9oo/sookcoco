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

  return (
    <>
      {schedule !== undefined && schedule.length !== 0 ? (
        <Grid templateColumns={templates} gap="10px">
          {schedule.map((item) => {
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
                src="/sookcoco-logo.png"
                alt="sookcoco-logo"
              />
              <Text pt="3px" color={'rgba(0,0,0,0.4)'}>
                스케줄을 추가해주세요
              </Text>
            </Flex>
          </Center>
        </Box>
      )}
    </>
  );
};

export default ScheduleList;
