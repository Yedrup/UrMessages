import React from 'react';
import styled from 'styled-components';
import Info from '../../components/UIFeedbackMessages/InfoMessage';
import SigninButton from '../../components/Sign/SigninButton';

const SigninPresentationStyled = styled.div`
  .info {
    font-size: 2rem;
  }
  .info__list {
    display: flex;
    list-style: none;
    margin: 0.5rem 0;
    padding: var(--padding-list);
    li {
      margin: 0.5rem 1rem;
    }
    span {
      margin-right: 0.1rem;
      color: ${({ theme }) => theme.backgroundCard};
    }
  }
  .info--signin {
    margin: 0 1rem;
    padding: var(--padding-list);
    button {
      padding: 1rem;
      background: ${({ theme }) => theme.highlightSecondary};
      color: white;
      font-size: 2rem;
    }
  }
`;

const SigninPresentation = () => {
  return (
    <SigninPresentationStyled>
      <Info
        info={{
          message: 'Sign in benefits :',
          icon: '⭐️',
        }}
      >
        <ul className="info__list">
          <li>
            <span>✓</span> Send messages
          </li>
          <li>
            <span>✓</span> Private Box
          </li>
        </ul>
        <span className="info--signin">
          <SigninButton />
        </span>
      </Info>
    </SigninPresentationStyled>
  );
};

export default SigninPresentation;
