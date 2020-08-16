import styled from 'styled-components';

const NavStyled = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  list-style: none;
  font-size: 1.9rem;
  grid-column: 1 / -1;
  & > * {
    padding: 0.5rem 1rem;
  }
  @media (max-width: 1300px) {
    & {
      width: 100%;
      justify-content: flex-end;
      align-items: flex-end;
    }
  }

  .link {
    cursor: pointer;
    position: relative;
    border: 0;
    display: flex;
    align-items: flex-end;
    margin: 0 0.5rem;
    text-transform: uppercase;
    font-weight: 600;
    color: ${({ theme }) => theme.lightgrey};
    @media (max-width: 700px) {
      & {
        font-size: 1.25rem;
      }
    }
  }

  .link--active {
    position: relative;
    color: ${({ theme }) => theme.highlight};
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 0.4rem;
      background: ${({ theme }) => theme.highlight};
      bottom: 0;
      left: 0;
      right: 0;
      transform: skew(-60deg);
      @media (max-width: 700px) {
        height: 0.2rem;
      }
    }
  }
`;

export default NavStyled;
