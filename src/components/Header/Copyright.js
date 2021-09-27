import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Copyright = () => {
  const onClickGitHub = () => {
    window.open('https://github.com/Se9oo/sookcoco', '_blank');
  };

  return (
    <Flex
      flexDirection="column"
      textAlign="center"
      justifyContent="center"
      alignItems="center"
      fontSize="xs"
    >
      <Text mb="5px">&copy; 2021. Park Se Hyun All rights reserved.</Text>
      <Box
        css={{
          '&:hover': {
            color: '#94d82d',
          },
        }}
      >
        <FontAwesomeIcon
          icon={faGithub}
          size="2x"
          cursor="pointer"
          onClick={onClickGitHub}
        />
      </Box>
    </Flex>
  );
};

export default Copyright;
