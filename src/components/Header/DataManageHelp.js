import React from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { Box, ListItem, OrderedList, UnorderedList } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/media-query';

const DataManageHelp = () => {
  const menuSize = useBreakpointValue({
    xxs: 'xs',
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'md',
  });

  const textSize = useBreakpointValue({
    xxs: 'xs',
    xs: 'xs',
    sm: 'sm',
    md: 'sm',
    lg: 'sm',
  });

  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'gray.100' }}>
            <Box
              fontSize={menuSize}
              fontWeight="bold"
              flex="1"
              textAlign="left"
            >
              데이터 백업/불러오기
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel fontSize={textSize}>
          <OrderedList>
            <ListItem mb="10px">
              <strong>'데이터 백업'</strong> 버튼을 누르면 클립보드에 숙코코
              데이터가 저장됩니다.
            </ListItem>
            <ListItem>
              클립보드에 복사된 데이터를 입력창에 붙여넣기 후{' '}
              <strong>'데이터 불러오기'</strong> 버튼을 누르면 숙코코 데이터를
              불러옵니다.
            </ListItem>
          </OrderedList>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'gray.100' }}>
            <Box
              fontSize={menuSize}
              fontWeight="bold"
              flex="1"
              textAlign="left"
            >
              컨텐츠 업데이트
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel fontSize={textSize}>
          <UnorderedList>
            <ListItem mb="10px">
              새롭게 추가되거나 변경된 컨텐츠 정보를 반영합니다.
            </ListItem>
            <ListItem>
              컨텐츠 업데이트시 각 컨텐츠의 수행 횟수는 초기화 됩니다. (EX 2/3
              &rarr; 0/3)
            </ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: 'gray.100' }}>
            <Box
              fontSize={menuSize}
              fontWeight="bold"
              flex="1"
              textAlign="left"
            >
              데이터 초기화
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel fontSize={textSize}>
          <UnorderedList>
            <ListItem mb="10px">숙코코의 모든 데이터를 초기화 합니다.</ListItem>
            <ListItem mb="10px">
              초기화하면 데이터를 복구 할 수 없으니 백업 후 초기화를 권장합니다.
            </ListItem>
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default DataManageHelp;
