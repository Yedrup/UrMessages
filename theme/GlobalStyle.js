import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 10px;
}
*,
*:before,
*:after {
  box-sizing: inherit
}
body {
  padding: 0;
  margin: 0;
  background: ${({ theme }) => theme.backgroundBody};
  text-align: center;
  line-height: 2;
  font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.lightgrey};
}
a {
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.highlight};
}
button, a.c-button {
  cursor: pointer;
  padding: 1rem;
  background: ${({ theme }) => theme.highlightSecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.elevation2};
  color: white;
  border:none;
  &:hover {
    box-shadow: ${({ theme }) => theme.elevation8};
  }
  @media (max-width: 700px) {
    padding: .5rem;
    font-size: 1rem;
    min-width: 8rem;
  }
}
.c-button--text {
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: none;
  &:hover {
    background: #80deea2b;
    box-shadow: ${({ theme }) => theme.elevation2};
  }
}
`;

export { GlobalStyle };
