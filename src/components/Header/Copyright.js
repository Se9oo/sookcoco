import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import dayjs from 'dayjs';

const Copyright = () => {
  const now = dayjs().format('YYYY');

  const onClickGitHub = () => {
    window.open('https://github.com/Se9oo/sookcoco', '_blank');
  };

  return (
    <Flex
      flexDirection="column"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="xs" mb="5px">
        &copy; {`${now}. se9oo All rights reserved.`}
      </Text>
      <Box
        css={{
          '&:hover': {
            color: '#94d82d',
          },
        }}
      >
        <FontAwesomeIcon
          icon={faGithub}
          size="lg"
          cursor="pointer"
          onClick={onClickGitHub}
        />
      </Box>
    </Flex>
  );
};

export default Copyright;
