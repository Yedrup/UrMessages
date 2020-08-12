import { useContext } from 'react';
import { UIStateContext, UIDispatchContext } from '../contexts/UIContext';
import styled from 'styled-components';
import Link from 'next/link';

import Nav from './Nav/Nav';
import labels from '../data/labels';

const { applicationName } = labels;

const Logo = styled.h1`
  margin-left: 1rem;
  position: relative;
  z-index: 2;
  transform: skew(-35deg);
  font-size: 4rem;
  a {
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.highlight};
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
    font-size: 2.25rem;
  }
`;

const StyledHeader = styled.header`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    background: #202020;
    border-bottom: 0.35rem solid #121212;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
`;

const Header = () => {
  // const { stateUI } = useContext(UIStateContext);

  return (
    <StyledHeader>
      <Logo>
        <Link href="/">
          <a>{applicationName}</a>
        </Link>
      </Logo>
      <Nav />
      {/* <span>is loading : {stateUI.isLoading ? `🔀` : `🤘`}</span>
      <span>is Error : {stateUI.isError ? `☠️` : `👌🏻`}</span> */}
    </StyledHeader>
  );
};

export default Header;
