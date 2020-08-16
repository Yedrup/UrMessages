import { useContext } from 'react';
import { UserStateContext } from '../contexts/UserContext';
import { getUserAvatarUUID } from '../lib/utils/getAvatarImage';
import Avatar from './Avatar';

const User = () => {
  const { stateUser } = useContext(UserStateContext);
  const url = getUserAvatarUUID({ size: 70, userId: stateUser.userId });
  return <Avatar imageUrl={url} />;
};

export default User;
