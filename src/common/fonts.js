import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'AppleSDGothicNeoHeading';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/AppleSDGothicNeoB.woff') format('woff');
      }
      
      @font-face {
        font-family: 'AppleSDGothicNeoBody';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/AppleSDGothicNeoL.woff') format('woff');
      }
      `}
  />
);

export default Fonts;
