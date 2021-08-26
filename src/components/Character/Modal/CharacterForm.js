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

const CharacterForm = (props) => {
  const {
    onOpen,
    onChangeServer,
    selectClass,
    onChangeName,
    onChangeLevel,
    onChangeItemLevel,
    characterInfo,
    mode,
  } = props;

  return (
    <>
      <FormControl mb={4} isRequired={mode === 'update' ? false : true}>
        <FormLabel>서버</FormLabel>
        <Select
          focusBorderColor="green.500"
          placeholder="서버를 선택해주세요."
          onChange={(option) => onChangeServer(option)}
          disabled={mode === 'update' ? true : false}
          value={characterInfo ? characterInfo.server : ''}
        >
          {servers.map((server) => (
            <option key={server.eng} value={server.eng}>
              {server.kor}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4} isRequired={mode === 'update' ? false : true}>
        <FormLabel>클래스</FormLabel>
        <Input
          focusBorderColor="green.500"
          placeholder="클래스를 선택해주세요."
          onClick={onOpen}
          value={selectClass}
          isReadOnly
          disabled={mode === 'update' ? true : false}
        />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>캐릭터 이름</FormLabel>
        <Input
          focusBorderColor="green.500"
          placeholder="캐릭터 이름"
          onChange={onChangeName}
          defaultValue={characterInfo ? characterInfo.name : null}
        />
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>캐릭터 레벨</FormLabel>
        <InputGroup>
          <InputLeftAddon children="Lv." />
          <Input
            type="number"
            focusBorderColor="green.500"
            placeholder="캐릭터 레벨"
            onChange={onChangeLevel}
            defaultValue={characterInfo ? characterInfo.level : null}
          />
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>아이템 레벨</FormLabel>
        <Input
          type="number"
          focusBorderColor="green.500"
          placeholder="아이템 레벨"
          onChange={onChangeItemLevel}
          defaultValue={characterInfo ? characterInfo.itemLevel : null}
        />
      </FormControl>
    </>
  );
};

export default CharacterForm;
