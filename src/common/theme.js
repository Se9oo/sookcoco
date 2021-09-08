import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  xxs: '17.5rem',
  xs: '20rem',
  sm: '36rem',
  md: '48rem',
  lg: '62rem',
  xl: '75rem',
});

const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    300: '#CBD5E0',
    500: '#718096',
  },
  red: {
    100: '#FED7D7',
    300: '#FC8181',
    500: '#E53E3E',
  },
  blue: {
    100: '#BEE3F8',
    300: '#63B3ED',
    500: '#3182CE',
  },
  green: {
    100: '#C6F6D5',
    300: '#68D391',
    500: '#38A169',
  },
  lime: '#94d82d',
};

export const theme = extendTheme({
  fonts: {
    heading: 'AppleSDGothicNeoHeading',
    body: 'AppleSDGothicNeoBody',
  },
  styles: {
    global: {
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        fontSize: '16px',
      },
      body: {
        backgroundColor: 'white',
      },
      'body, input, a, ol, ul, li, button': {
        fontFamily: `Apple SD Gothic','Noto Sans KR','맑은고딕','Nanum Gothic','sans-serif`,
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      'ol, ul, li': {
        listStyle: 'none',
      },
      img: {
        display: 'block',
      },
      'input, button': {
        backgroundColor: 'transparent',
      },
    },
  },
  breakpoints,
  colors,
});
