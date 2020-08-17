import styled from 'styled-components';
import {
  getUserAvatarUUID,
  getRandomAvatarPhoto,
} from '../lib/utils/getAvatarImage';

export const defaultAvatarSize = '70px';
const AvatarStyled = styled.div`
  --avatar-radius: 50%;
  border-radius: var(--avatar-radius);
  background: ${({ theme }) => theme.skeletonBg};
  img {
    border-radius: var(--avatar-radius);
  }
  img:hover {
    transform: scale(1.3);
  }
`;

const Avatar = ({ userId, size }) => {
  const sizeToUse = size ? size : defaultAvatarSize;
  const imageUrl = userId
    ? getUserAvatarUUID({ size: sizeToUse, userId })
    : getRandomAvatarPhoto({ size: sizeToUse });
  return (
    <AvatarStyled
      className="c-avatar"
      css={{ width: `${sizeToUse}`, height: `${sizeToUse}` }}
    >
      <img src={imageUrl} alt={`user ${userId}`} />
    </AvatarStyled>
  );
};

export default Avatar;
