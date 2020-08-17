import { useContext } from 'react';
import wait from 'waait';
import styled from 'styled-components';
import { USER_TEST_ID } from '../../lib/config';
import { connect } from '../../lib/data-treatment-service';
import { UIDispatchContext } from '../../contexts/UIContext';
import { UserDispatchContext } from '../../contexts/UserContext';

const ButtonSigninStyled = styled.button`
  font-size: ${({ theme }) => theme.connectFontSize};
  min-width: 10rem;
  font-weight: 600;
`;

const SigninButton = () => {
  const { dispatchUI } = useContext(UIDispatchContext);
  const { dispatchUser } = useContext(UserDispatchContext);

  let tryUserId = USER_TEST_ID;

  const connectUser = async () => {
    dispatchUI({
      type: 'START_BUSY',
    });
    // await wait(1000);
    await connect({ userId: tryUserId })
      .then(({ user }) => {
        dispatchUser({ type: 'USER_CONNECTION', payload: { user } });
        dispatchUI({
          type: 'END_BUSY',
        });
      })
      .catch(err => {
        dispatchUI({
          type: 'IS_ERROR',
        });
        dispatchUI({
          type: 'END_BUSY',
        });
      });
  };

  return (
    <ButtonSigninStyled className="c-button" onClick={connectUser}>
      Sign In
    </ButtonSigninStyled>
  );
};

export default SigninButton;
