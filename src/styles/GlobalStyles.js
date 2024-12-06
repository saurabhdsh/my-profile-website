import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    cursor: none !important;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .cursor-dot {
    width: 8px;
    height: 8px;
    background: rgba(0, 77, 64, 0.7);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
  }

  .cursor-circle {
    width: 40px;
    height: 40px;
    background: transparent;
    border: 2px solid rgba(0, 77, 64, 0.4);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
  }

  /* Prevent cursor from changing on any interactive elements */
  a, button, input, textarea, select, [role="button"] {
    cursor: none !important;
    &:active {
      cursor: none !important;
    }
  }

  /* Hover effects */
  a:hover ~ .cursor-circle,
  button:hover ~ .cursor-circle {
    width: 60px;
    height: 60px;
    border-color: rgba(0, 77, 64, 0.6);
  }

  /* Active state */
  a:active ~ .cursor-dot,
  button:active ~ .cursor-dot {
    transform: translate(-50%, -50%) scale(0.8);
  }

  a:active ~ .cursor-circle,
  button:active ~ .cursor-circle {
    transform: translate(-50%, -50%) scale(1.2);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

export default GlobalStyles;
