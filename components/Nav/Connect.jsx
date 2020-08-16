import { useContext } from 'react';
import { UserStateContext } from '../../contexts/UserContext';
import SignoutButton from '../Sign/SignoutButton';
import SigninButton from '../Sign/SigninButton';

const Connext = () => {
  const { stateUser } = useContext(UserStateContext);
  const { userId } = stateUser;
  return (
    <li>
      {!userId && <SigninButton />}
      {userId && <SignoutButton />}
    </li>
  );
};

export default Connext;
