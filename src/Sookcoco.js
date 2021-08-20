import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles, { theme } from './common/GlobalStyles';

const Sookcoco = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Container>hi!</Container>
      </ThemeProvider>
    </>
  );
};

export default Sookcoco;

const Container = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
`;
