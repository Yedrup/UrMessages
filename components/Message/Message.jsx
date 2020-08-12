import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const StyledMessageItem = styled.article`
  --padding: 1rem;
  padding: 0;
  background: #353535;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.elevation1};
  &:hover {
    box-shadow: ${({ theme }) => theme.elevation8};
  }
  header {
    padding: var(--padding);
    text-align: left;
  }
  section {
    padding: var(--padding);
    background: #454545;
    text-align: justify;
    color: whitesmoke;
  }
  footer {
    padding: var(--padding);
    text-align: right;
    color: grey;
  }
`;

const Message = ({ message }) => {
  if (!message) return null;
  const { title, isPublic, content, id, isThreadAllowed, date } = message;
  const router = useRouter();

  // fallback in case there is no router.query.type
  const type = router.query.type
    ? router.query.type
    : isPublic
    ? 'public'
    : 'private';

  // check if the current message is displayed on a thread page
  const areWeOnMessageThreadPage = !!router.query.id;

  return (
    <StyledMessageItem>
      <header>
        <h3>
          {title} <span>{isPublic ? '📣' : '🔒'}</span>
        </h3>
      </header>
      <section>
        {content}
        <p>{id}</p>
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
            <a className="c-button--text">SEE THREAD →</a>
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
