import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MessageItem from '../Message/Message';

const ListOfItemsStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-gap: 60px;
`;

const MessagesList = ({ messages }) => {
  if (!messages && !messages?.length) return null;
  return (
    <ListOfItemsStyled>
      {messages.map(message => {
        return <MessageItem message={message} key={message?.id} />;
      })}
    </ListOfItemsStyled>
  );
};

export default MessagesList;

MessagesList.propTypes = {
  message: PropTypes.array,
};
