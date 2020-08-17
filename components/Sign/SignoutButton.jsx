import { useContext } from 'react';
import styled from 'styled-components';
import {
  UserStateContext,
  UserDispatchContext,
} from '../../contexts/UserContext';
import { UIDispatchContext } from '../../contexts/UIContext';
import { disconnect } from '../../lib/data-treatment-service';

const ButtonSignOutStyled = styled.button`
  min-width: 10rem;
  font-size: ${({ theme }) => theme.connectFontSize};
  font-weight: 600;
  background: #80deea2b;
  color: ${({ theme }) => theme.highlight};
`;

const SignoutButton = () => {
  const { dispatchUI } = useContext(UIDispatchContext);
  const { dispatchUser } = useContext(UserDispatchContext);
  const { stateUser } = useContext(UserStateContext);

  const disconnectUser = async () => {
    dispatchUI({
      type: 'START_BUSY',
    });
    await disconnect({ userId: stateUser.userId })
      .then(({ message }) => {
        dispatchUser({ type: 'USER_DISCONNECTION', message });
        dispatchUI({
          type: 'END_BUSY',
        });
        dispatchUI({ type: 'RESET' });
      })
      .catch(err => {
        dispatchUI({
          type: 'IS_ERROR',
        });
      });
  };

  return (
    <ButtonSignOutStyled className="c-button" onClick={disconnectUser}>
      Sign Out
    </ButtonSignOutStyled>
  );
};

export default SignoutButton;
