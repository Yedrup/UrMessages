import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SimpleBar from 'simplebar-react';
import MessageItem from '../Message/Message';

const SimpleBarStyled = styled(SimpleBar)`
  .simplebar-scrollbar:before {
    border-radius: 7px;
    left: 2px;
    right: 2px;
    opacity: 0;
    transition: opacity 0.2s linear;
    background: linear-gradient(${({ theme }) => theme.gradientToBottom});
  }
`;

const ListOfItemsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: 40px;
`;

const MessagesList = ({ messages }) => {
  if (!messages?.length) return null;
  return (
    <SimpleBarStyled
      style={{ maxHeight: 900 }}
      autoHide={false}
      scrollbarMaxSize={650}
      scrollbarMinSize={425}
    >
      <ListOfItemsStyled data-testid="thread-message-list">
        {messages.map(message => {
          return <MessageItem message={message} key={message?.id} />;
        })}
      </ListOfItemsStyled>
    </SimpleBarStyled>
  );
};

export default MessagesList;

MessagesList.propTypes = {
  message: PropTypes.array,
};
