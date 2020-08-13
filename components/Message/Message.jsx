import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Avatar, { avatarSize } from '../Avatar';
import getRandomAvatarPhoto from '../../lib/utils/getRandomAvatar';

const StyledMessageItem = styled.article`
  --padding: 1rem 2.5rem;
  padding: 0;
  background: ${({ theme }) => theme.backgroundCard};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.elevation1};
  &:hover {
    box-shadow: ${({ theme }) => theme.elevation8};
  }
  header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--padding);
    color: #aaeeee;
    & h3 {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .user {
      margin-right: 1rem;
      display: flex;
      span {
        margin-left: 1rem;
      }
      .username {
        color: #aaeeeede;
      }
    }
  }
  section {
    padding: var(--padding);
    overflow-wrap: anywhere;
    text-align: justify;
    color: ${({ theme }) => theme.offWhite};
    p {
      background: #0000002b;
      padding: 2rem 1rem;
    }
  }
  footer {
    padding: var(--padding);
    text-align: right;
    color: grey;
    p {
      margin: 0.5rem;
    }
    .small-text {
      font-size: 1.3rem;
    }
  }
`;

const Message = ({ message }) => {
  if (!message) return null;
  const { title, isPublic, content, id, isThreadAllowed, date, user } = message;
  const router = useRouter();

  // fallback in case there is no router.query.type
  const type = router?.query?.type
    ? router?.query?.type
    : isPublic
    ? 'public'
    : 'private';

  const imageUrl = getRandomAvatarPhoto(avatarSize);
  // check if the current message is displayed on a thread page
  const areWeOnMessageThreadPage = !!router?.query?.id;

  return (
    <StyledMessageItem data-testid="message-item">
      <header>
        <h3>
          <span>{title}</span>
          <span>{isPublic ? '📣' : '🔒'} </span>
        </h3>
        <div className="user">
          <Avatar imageUrl={imageUrl} />
          <span className="username">{user}</span>
        </div>
      </header>
      <section>
        <p>{content}</p>
      </section>
      <footer>
        <p>{date}</p>
        {/* <p className="small-text">id:{id}</p> */}
        {isThreadAllowed && !areWeOnMessageThreadPage && (
          <Link
            href={{
              pathname: '/messages/[type]/[id]',
              query: { type, isPublic },
            }}
            as={`/messages/${type}/${id}`}
            key={id}
          >
            <a data-testid="thread-link" className="c-button--text">
              SEE THREAD →
            </a>
          </Link>
        )}
      </footer>
    </StyledMessageItem>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.object,
};
