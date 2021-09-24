import React, { useEffect, useState } from 'react';

import { Divider, Flex, Text } from '@chakra-ui/layout';

import { useBreakpointValue } from '@chakra-ui/media-query';
import { Avatar } from '@chakra-ui/avatar';
import { Button, ButtonGroup } from '@chakra-ui/button';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const ScheduleCard = ({ item, selectCharacter, mode }) => {
  const buttonSize = useBreakpointValue({
    xxs: 'xs',
    xs: 'xs',
    sm: 'md',
  });

  const size = useBreakpointValue({
    xxs: 'sm',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  const direction = useBreakpointValue({
    xxs: 'row',
    xs: 'row',
    sm: 'row',
    md: 'column',
    lg: 'column',
  });

  const { src, key, kor } = item;
  const [doneCount, setDoneCount] = useState(item.done);
  const [checkCount, setCheckCount] = useState(item.checkCount);

  useEffect(() => {
    if (mode !== 'expedition') {
      setDoneCount(item.done);
      setCheckCount(item.checkCount);
    }
  }, [selectCharacter]);

  useEffect(() => {
    if (mode === 'expedition') {
      const data = JSON.parse(window.localStorage.getItem('sookcoco'));

      if (data && data.hasOwnProperty('expedition')) {
        const expeditionIdx = data.expedition.findIndex(
          (exp) => exp.key === item.key
        );

        if (expeditionIdx !== -1) {
          setDoneCount(data.expedition[expeditionIdx].done);
          setCheckCount(data.expedition[expeditionIdx].checkCount);
        }
      }
    }
  }, []);

  // 횟수 증가 버튼
  const onClickBtn = (action) => () => {
    if (action === 'add' && doneCount === checkCount) {
      return;
    }

    if (action === 'minus' && doneCount === 0) {
      return;
    }

    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));
    const data = origin.characters;

    if (mode === 'expedition') {
      const expeditionIdx = origin.expedition.findIndex(
        (exp) => exp.key === item.key
      );

      action === 'add'
        ? origin.expedition[expeditionIdx].done++
        : origin.expedition[expeditionIdx].done--;
    } else {
      data.map((character) => {
        if (character.characterKey === selectCharacter) {
          character.schedule[`${mode}`].map((sch) => {
            if (sch.key === item.key)
              action === 'add' ? sch.done++ : sch.done--;
          });
        }
      });
    }

    window.localStorage.setItem('sookcoco', JSON.stringify(origin));

    setDoneCount((prev) => (action === 'add' ? prev + 1 : prev - 1));
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      p="10px"
      borderRadius="xl"
      bg="gray.50"
    >
      <Flex
        flexDirection={direction}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDirection={direction} alignItems="center">
          <Avatar
            src={src ? `${src}` : '/sookcoco-logo.png'}
            name={key}
            size={size}
            bg="transparent"
            m="5px"
          />
          <Text fontSize={size}>{kor}</Text>
        </Flex>
        <Flex>
          <Text fontSize={size}>{doneCount}</Text>
          <span>/</span>
          <Text fontSize={size}>{checkCount}</Text>
        </Flex>
      </Flex>
      <Divider mb="10px" />
      <ButtonGroup w="100%">
        <Button w="50%" size={buttonSize} onClick={onClickBtn('add')}>
          <AddIcon />
        </Button>
        <Button w="50%" size={buttonSize} onClick={onClickBtn('minus')}>
          <MinusIcon />
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default ScheduleCard;
