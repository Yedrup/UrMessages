import { useContext } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { UserStateContext } from '../../contexts/UserContext';
import MessagesPage from '../containers/MessagesPage';
import ProtectedWrapper from '../../components/ProtectedWrapper';
import Message from '../../components/Message/Message';
import SigninPresentation from '../../components/Sign/SigninPresentation';

const SectionHomeStyled = styled.section`
  header {
    display: flex;
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

const HomeStyled = styled.div`
  text-align: left;
  --padding-list: 0rem 2rem;

  .home__title {
    font-size: 2.7rem;
    color: var(--main-color);
  }
`;

const MessagesHome = ({ lastPublicMessage, lastPrivateMessage }) => {
  const { stateUser } = useContext(UserStateContext);
  const { isConnected } = stateUser;
  const thereIsNoMessage = !lastPublicMessage && !lastPrivateMessage;
  return (
    <HomeStyled>
      <MessagesPage headTitle="✉️ Home">
        <h1 className="home__title">Welcome! 👋</h1>
        {thereIsNoMessage && (
          <p>It seems that there is no messages to display!</p>
        )}
        {lastPublicMessage && (
          <SectionHomeStyled>
            <header>
              <h2>
                Newest
                <Link href="/messages/public">
                  <a>Public Messages</a>
                </Link>
              </h2>
            </header>
            <Message message={lastPublicMessage ? lastPublicMessage : null} />
          </SectionHomeStyled>
        )}
        <ProtectedWrapper
          fallBack={<SigninPresentation />}
          accessCondition={isConnected}
        >
          {lastPrivateMessage && (
            <SectionHomeStyled>
              <header>
                <h2>
                  Newest
                  <Link href="/messages/private">
                    <a>Private Messages</a>
                  </Link>
                </h2>
              </header>
              <Message
                message={lastPrivateMessage ? lastPrivateMessage : null}
              />
            </SectionHomeStyled>
          )}
        </ProtectedWrapper>
      </MessagesPage>
    </HomeStyled>
  );
};
export default MessagesHome;
