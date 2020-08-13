import styled from 'styled-components';

export const avatarSize = '70px';
const AvatarStyled = styled.div`
  --avatar-radius: 50%;
  width: ${avatarSize};
  height: ${avatarSize};
  border-radius: var(--avatar-radius);
  background: ${({ theme }) => theme.skeletonBg};
  img {
    border-radius: var(--avatar-radius);
  }
`;

const Avatar = ({ imageUrl }) => {
  return (
    <AvatarStyled className="c-avatar">
      <img src={imageUrl} alt="user" />
    </AvatarStyled>
  );
};

export default Avatar;
