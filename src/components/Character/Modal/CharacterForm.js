import React, { useEffect, useState } from 'react';

import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Select,
  Button,
  Flex,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { servers, schedule as commonSchedule } from '../../../common/common';

const CharacterForm = (props) => {
  const {
    onOpen,
    selectClass,
    characterInfo,
    setCharacterList,
    setSelectCharacter,
    setSchedule,
    mode,
    close,
  } = props;

  const [isSelectClassError, setIsSelectClassError] = useState(false);

  // 클래스 선택 error 일 때 클래스 선택하면 error 취소
  useEffect(() => {
    if (isSelectClassError && selectClass) {
      setIsSelectClassError(false);
    }
  }, [selectClass]);

  const numberInputFormat = (e) => {
    let checkNum;
    if (e.key !== undefined) {
      checkNum =
        e.key === 'e' || e.key === '.' || e.key === '+' || e.key === '-';
    } else if (e.keyCode !== undefined) {
      checkNum =
        e.keyCode === 69 ||
        e.keyCode === 190 ||
        e.keyCode === 187 ||
        e.keyCode === 189;
    }

    return checkNum && e.preventDefault();
  };

  // form validation
  const validationSchema = Yup.object().shape({
    server: Yup.string().required('서버를 선택해 주세요.'),
    name: Yup.string()
      .max(12, '이름은 최대 12자 입니다.')
      .required('이름을 입력해 주세요.'),
    level: Yup.number()
      .min(1, '최소 레벨은 1 입니다.')
      .max(60, '최대 레벨은 60 입니다.'),
    itemLevel: Yup.number().max(
      2000,
      '아이템 레벨은 2000 이하로 설정 가능합니다.'
    ),
  });

  // 캐릭터 추가/수정
  const onSubmitForm = (data, { setSubmitting }) => {
    setSubmitting(true);
    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    if (mode !== 'update') {
      data.characterKey = 0;
      data.selectClass = selectClass;

      // 캐릭터 추가시 클래스 선택 값 없는 경우 예외처리
      if (!selectClass) {
        setIsSelectClassError(true);
        return;
      } else {
        if (isSelectClassError) {
          setIsSelectClassError(false);
        }
      }

      // sookcoco key가 존재하지 않으면 (첫 캐릭터 생성시)
      if (!origin) {
        const userObj = {
          characters: [data],
          expedition: commonSchedule.expedition,
        };

        userObj.characters[0].characterKey = 0;

        window.localStorage.setItem('sookcoco', JSON.stringify(userObj));
        setCharacterList([data]);
      } else {
        if (origin !== null && origin.hasOwnProperty('characters')) {
          data.characterKey = origin.characters.length;
          origin.characters.push(data);
        } else {
          origin.characters = [{ data }];
        }

        window.localStorage.setItem('sookcoco', JSON.stringify(origin));
        setCharacterList([...origin.characters]);
      }
    } else {
      origin.characters.map((character) => {
        if (character.characterKey === characterInfo.characterKey) {
          character.name = data.name;
          character.level = data.level;
          character.itemLevel = data.itemLevel;
        }

        return data;
      });

      window.localStorage.setItem('sookcoco', JSON.stringify(origin));

      setCharacterList([...origin.characters]);
    }

    setSubmitting(false);

    close();
  };

  // 캐릭터 삭제
  const onClickDeleteBtn = () => {
    const origin = JSON.parse(window.localStorage.getItem('sookcoco'));

    const deleteIdx = origin.characters.findIndex(
      (character) => character.characterKey === characterInfo.characterKey
    );

    origin.characters.splice(deleteIdx, 1);

    window.localStorage.setItem('sookcoco', JSON.stringify(origin));

    setSchedule({
      daily: [],
      weekly: [],
      expedition: [],
    });
    setSelectCharacter(-1);
    setCharacterList([...origin.characters]);

    close();
  };

  return (
    <Formik
      initialValues={{
        server: characterInfo ? characterInfo.server : '',
        name: characterInfo ? characterInfo.name : '',
        level: characterInfo ? characterInfo.level : '',
        itemLevel: characterInfo ? characterInfo.itemLevel : '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmitForm}
    >
      {({ values, handleChange }) => (
        <Form>
          <Field name="server">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired={mode === 'update' ? false : true}
                isInvalid={form.errors.server && form.touched.server}
              >
                <FormLabel>서버</FormLabel>
                <Select
                  name="server"
                  {...field}
                  focusBorderColor="green.500"
                  placeholder="서버를 선택해주세요."
                  onChange={handleChange}
                  disabled={mode === 'update' ? true : false}
                  value={values.server}
                >
                  {servers.map((server) => (
                    <option key={server.eng} value={server.eng}>
                      {server.kor}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{form.errors.server}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <FormControl
            mb={isSelectClassError ? 2 : 4}
            isRequired={mode === 'update' ? false : true}
          >
            <FormLabel>클래스</FormLabel>
            <Input
              name="selectClass"
              focusBorderColor="green.500"
              isInvalid={isSelectClassError}
              errorBorderColor="red.500"
              borderWidth={isSelectClassError ? '2px' : '1px'}
              placeholder="클래스를 선택해주세요."
              onClick={onOpen}
              value={selectClass}
              isReadOnly
              disabled={mode === 'update' ? true : false}
            />
          </FormControl>
          {isSelectClassError ? (
            <Text fontSize="sm" color="red.500" mb={2}>
              클래스를 선택해 주세요.
            </Text>
          ) : null}
          <Field name="name">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isRequired
                isInvalid={form.errors.name && form.touched.name}
              >
                <FormLabel>캐릭터 이름</FormLabel>
                <Input
                  name="name"
                  {...field}
                  focusBorderColor="green.500"
                  placeholder="캐릭터 이름"
                  onChange={handleChange}
                  value={values.name}
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="level">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isInvalid={form.errors.level && form.touched.level}
              >
                <FormLabel>캐릭터 레벨</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="Lv." />
                  <Input
                    type="number"
                    {...field}
                    name="level"
                    focusBorderColor="green.500"
                    placeholder="캐릭터 레벨"
                    onChange={handleChange}
                    onKeyDown={numberInputFormat}
                    value={values.level}
                    min="0"
                    max="60"
                  />
                </InputGroup>
                <FormErrorMessage>{form.errors.level}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="itemLevel">
            {({ field, form }) => (
              <FormControl
                mb={4}
                isInvalid={form.errors.itemLevel && form.touched.itemLevel}
              >
                <FormLabel>아이템 레벨</FormLabel>
                <Input
                  type="number"
                  name="itemLevel"
                  {...field}
                  focusBorderColor="green.500"
                  placeholder="아이템 레벨"
                  onChange={handleChange}
                  onKeyDown={numberInputFormat}
                  value={values.itemLevel}
                  min="0"
                  max="2000"
                />
                <FormErrorMessage>{form.errors.itemLevel}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Flex justifyContent="flex-end">
            {mode === 'update' && (
              <Button colorScheme="red" mr="5px" onClick={onClickDeleteBtn}>
                삭제
              </Button>
            )}
            <Button type="submit" colorScheme="green" mr="5px">
              {mode === 'update' ? '수정' : '추가'}
            </Button>
            <Button onClick={close}>취소</Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default CharacterForm;
