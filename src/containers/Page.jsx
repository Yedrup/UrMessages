import React, { Component } from 'react';
import Header from '../../components/Header';
import Meta from '../../components/Meta';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  highlight: '#80deea',
  backgroundBody: '#121212',
  backgroundCard: '#424242',
  lightgrey: '#E1E1E1',
  textColor: '#E1E1E1',
  black: '#393939',
  grey: '#3A3A3A',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  borderRadius: '.25rem',
  /*  from cheat sheet : https://codepen.io/topherlen/pen/rZGMpQ */
  elevation0:
    '0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12)',
  elevation1:
    '0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
  elevation2:
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
  elevation3:
    '0 3px 3px -2px rgba(0, 0, 0, 0.2),0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12)',
  elevation4:
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  elevation6:
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
  elevation8:
    '0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
  elevation12:
    '0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)',
  elevation16:
    '0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
  elevation24:
    '0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
};

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
  background: ${({ theme }) => theme.highlight};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.elevation2};
  color: black;
  border:none;
  &:hover {
    box-shadow: ${({ theme }) => theme.elevation8};
  }
}

.c-button--text {
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  &:hover {
    background: #80deea2b;
    box-shadow: ${({ theme }) => theme.elevation2};
  }
}
`;

const StyledPage = styled.div`
  transition: all 0.5s linear;
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
