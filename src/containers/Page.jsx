import React, { Component } from 'react';
import Header from '../../components/Header';
import Meta from '../../components/Meta';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../theme/theme';
import { GlobalStyle } from '../../theme/GlobalStyle';

const StyledPage = styled.div`
  transition: all 0.5s linear;
`;

const InnerStyled = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  @media (max-width: 700px) {
    padding: 0;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <StyledPage>
          <Meta />
          <Header />
          <InnerStyled>{this.props.children}</InnerStyled>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
