import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 14px;
  }

  body, input, a, ol, ul, li, button {
    font-family: 'Apple SD Gothic','Noto Sans KR','맑은고딕','Nanum Gothic',sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
  }

  input, button {
    background-color: transparent;
  }
`;

const size = {
  mobile: '479px',
  tablet: '767px',
  laptop: '980px',
  desktop: '1024px',
};

export const theme = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
};

export default GlobalStyles;
