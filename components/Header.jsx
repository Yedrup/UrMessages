import styled from 'styled-components';
import Link from 'next/link';
import Nav from './Nav/Nav';
import { labels } from '../lib/config';

const { applicationName } = labels;

const StyledHeader = styled.header`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #311f40;
  box-shadow: ${({ theme }) => theme.elevation3};
  z-index: 20;
  @media (max-width: 1000px) {
    position: relative;
    justify-content: center;
    flex-direction: column;
    padding: 0.5rem;
  }
`;

const Logo = styled.h1`
  position: relative;
  display: flex;
  margin-left: 1rem;
  z-index: 2;
  transform: skew(-35deg);
  font-size: 2.85rem;
  a {
    color: ${({ theme }) => theme.highlight};
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    font-size: 2.5rem;
    margin: 0.5rem;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo>
        <Link href="/">
          <a>{applicationName}</a>
        </Link>
      </Logo>
      <Nav />
    </StyledHeader>
  );
};

export default Header;
