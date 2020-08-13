import PropTypes from 'prop-types';
import MessageItem from '../Message/Message';
import MessagesList from '../MessagesList/MessagesList';
import CreateMessage from '../CreateMessage/CreateMessage';
import styled from 'styled-components';

const InitialMessage = styled.div`
  margin: 2rem 0;
  background: black;
  color: white;
  article {
    margin: auto;
    background: black;
    color: #aaeeee;
  }
`;

const Thread = ({ parentMessage, thread }) => {
  let isThreadMessages = !!thread?.messages?.length;
  return (
    <div>
      <h2>Thread of Message {parentMessage.id} </h2>
      <InitialMessage>
        <MessageItem message={{ ...parentMessage, isThreadAllowed: false }} />
      </InitialMessage>
      {isThreadMessages && <MessagesList messages={thread.messages} />}
      {!isThreadMessages && (
        <h3 data-testid="start-thread-message">Start a thread ! 👇</h3>
      )}
      <CreateMessage
        ctx={{
          isPublic: parentMessage.isPublic,
          parentId: parentMessage.id,
          id: thread?.id,
        }}
      />
    </div>
  );
};

Thread.propTypes = {
  parentMessage: PropTypes.object,
  thread: PropTypes.object,
};

export default Thread;
