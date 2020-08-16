import { useContext } from 'react';
import wait from 'waait';
import { UserStateContext } from '../contexts/UserContext';
import styled from 'styled-components';
import Link from 'next/link';
import Nav from './Nav/Nav';
import User from './User';
import { labels } from '../lib/config';

const { applicationName } = labels;

const StyledHeader = styled.header`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 20;
    display: grid;
    grid-template-columns: 1fr 10rem;
    grid-auto-rows: 6.5rem;
    grid-gap: 10px;
    justify-content: space-between;
    align-items: stretch;
    padding:  1.5rem 2rem .5rem;;
    background: #291c29;
    box-shadow: ${({ theme }) => theme.elevation3};
    @media (max-width: 1300px) {
      position: relative;
      justify-content: center;
      padding: .5rem;
    }
  }
`;

const Logo = styled.h1`
  margin-left: 1rem;
  position: relative;
  z-index: 2;
  transform: skew(-35deg);
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.highlight};
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    font-size: 2.5rem;
  }
`;

const UserHeaderStyled = styled(User)`
    justify-self: end;
  }
`;

const Header = () => {
  const { stateUser } = useContext(UserStateContext);
  return (
    <StyledHeader>
      <Logo>
        <Link href="/">
          <a>{applicationName}</a>
        </Link>
      </Logo>
      {stateUser.userId && stateUser.isConnected && <UserHeaderStyled />}
      <Nav />
    </StyledHeader>
  );
};

export default Header;
