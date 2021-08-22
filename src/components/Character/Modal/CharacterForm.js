import React from 'react';

import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Select,
} from '@chakra-ui/react';

import { servers } from '../../../common/common';

const CharacterForm = ({ onOpen, selectClass }) => {
  return (
    <>
      <FormControl mb={4}>
        <FormLabel>서버</FormLabel>
        <Select
          focusBorderColor="green.500"
          placeholder="서버를 선택해주세요."
          isRequired
        >
          {servers.map((server) => (
            <option key={server.value} value={server.value}>
              {server.name}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>클래스</FormLabel>
        <Input
          focusBorderColor="green.500"
          placeholder="클래스를 선택해주세요."
          onClick={onOpen}
          value={selectClass}
          isReadOnly
          isRequired
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>캐릭터 이름</FormLabel>
        <Input
          focusBorderColor="green.500"
          placeholder="캐릭터 이름"
          isRequired
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>캐릭터 레벨</FormLabel>
        <InputGroup>
          <InputLeftAddon children="Lv." />
          <Input
            type="number"
            focusBorderColor="green.500"
            placeholder="캐릭터 레벨"
            isRequired
          />
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>아이템 레벨</FormLabel>
        <Input
          type="number"
          focusBorderColor="green.500"
          placeholder="아이템 레벨"
          isRequired
        />
      </FormControl>
    </>
  );
};

export default CharacterForm;
