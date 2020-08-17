import { useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { UserStateContext } from '../../contexts/UserContext';

const StyledMessageItem = styled.article`
  --padding: 1rem 2.5rem;
  padding: var(--padding);
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
    color: #aaeeee;
    & h3 {
      width: 100%;
      display: flex;
      justify-content: space-between;
      word-break: break-all;
      text-align: left;
    }
    .user {
      display: flex;
      margin-right: 1rem;
      .user__image {
        position: relative;
      }
      .user__name {
        margin-left: 1rem;
        color: #aaeeeede;
      }
      .me-text {
        position: absolute;
        bottom: -1rem;
        right: -1rem;
        display: inline-block;
        padding: 0.5rem 1rem;
        background: #ff00cad6;
        border-radius: 50%;
        transform: skew(10deg, -10deg);
        text-align: center;
        font-size: 1rem;
        color: #f5f5f5;
      }
    }
  }
  section {
    overflow-wrap: anywhere;
    text-align: justify;
    color: ${({ theme }) => theme.offWhite};
    p {
      margin: 4rem 0;
      padding: 1.5rem;
      background: #0000002b;
      font-size: 1.7rem;
      @media (max-width: 700px) {
        margin: 2rem 0;
      }
    }
  }
  footer {
    text-align: right;
    color: #d3d3d3;
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
  const {
    title,
    isPublic,
    content,
    id,
    isThreadAllowed,
    date,
    userId,
  } = message;
  const { stateUser } = useContext(UserStateContext);
  const router = useRouter();
  // Fallback in case there is no router.query.type
  const type = router?.query?.type
    ? router?.query?.type
    : isPublic
    ? 'public'
    : 'private';

  const itsMe = userId && userId === stateUser?.userId;

  // Check if the current message is displayed on a thread page
  const areWeOnMessageThreadPage = !!router?.query?.id;

  return (
    <StyledMessageItem data-testid="message-item">
      <header>
        <h3>
          <span>{title}</span>
          <span>{isPublic ? '📣' : '🔒'} </span>
        </h3>
        <div className="user">
          <div className="user__image">
            <Avatar userId={userId} />
            {itsMe && <span className="me-text">me</span>}
          </div>
          <span className="user__name">{userId}</span>
        </div>
      </header>
      <section>
        <p>{content}</p>
      </section>
      <footer>
        <p>{date}</p>
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
