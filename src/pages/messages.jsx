import React, { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { DataStateContext } from '../../contexts/DataContext';

import MessagesPage from '../containers/MessagesPage';
import Message from '../../components/Message/Message';

const SectionHome = styled.section`
  header {
    display: flex;
    align-items: center;
  }
  header a:before {
    content: '→';
    margin-right: 0.5rem;
  }

  header a {
    margin: 0 1rem;
    color: #daf3f1;
    font-size: 1.5rem;
    font-weight: 500;
    border-bottom: 1px solid #daf3f187;
  }
`;

const MessagesHome = props => {
  const { stateData } = useContext(DataStateContext);

  const lastPublicMessage =
    stateData?.public?.messages[stateData?.public?.messages?.length - 1];

  const lastPrivateMessage =
    stateData?.private?.messages[stateData?.private?.messages?.length - 1];

  return (
    <div>
      <MessagesPage headTitle="✉️ Home">
        <SectionHome>
          <header>
            <h2>
              Newest
              <Link href="/messages/public">
                <a>Public Messages</a>
              </Link>
            </h2>
          </header>
          <Message message={lastPublicMessage ? lastPublicMessage : null} />
        </SectionHome>

        <SectionHome>
          <header>
            <h2>
              Newest
              <Link href="/messages/private">
                <a>Private Messages</a>
              </Link>
            </h2>
          </header>
          <Message message={lastPrivateMessage ? lastPrivateMessage : null} />
        </SectionHome>
      </MessagesPage>
    </div>
  );
};
export default MessagesHome;
