import styled from 'styled-components';

const NavStyled = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  align-items: center;
  list-style: none;
  font-size: 2rem;

  .link {
    cursor: pointer;
    border: 0;
    position: relative;
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 1.9rem;
    font-weight: 700;
    color: ${({ theme }) => theme.lightgrey};
    @media (max-width: 700px) {
      & {
        font-size: 1.65rem;
        padding: 0 0.5;
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
    }
  }

  @media (max-width: 1300px) {
    & {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default NavStyled;
