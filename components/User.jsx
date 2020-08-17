import { useContext } from 'react';
import { UserStateContext } from '../contexts/UserContext';
import Avatar from './Avatar';

const User = () => {
  const { stateUser } = useContext(UserStateContext);
  return <Avatar userId={stateUser?.userId} size={'50px'} />;
};

export default User;
