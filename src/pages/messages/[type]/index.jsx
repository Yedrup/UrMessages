import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getAllMessagesFromType } from '../../../../lib/data-treatment-service';
import {
  UIDispatchContext,
  UIStateContext,
} from '../../../../contexts/UIContext';
import {
  DataStateContext,
  DataDispatchContext,
} from '../../../../contexts/DataContext';
import MessagesPage from '../../../containers/MessagesPage';
import MessagesList from '../../../../components/MessagesList/MessagesList';
import CreateMessage from '../../../../components/CreateMessage/CreateMessage';

// TODO: get context to pass private messages
const MessagesByTypePage = ({ pageProps }) => {
  const { data } = pageProps;

  const router = useRouter();
  const { type: typeFromRouter } = router.query;

  const { dispatchUI } = useContext(UIDispatchContext);
  const { stateUI } = useContext(UIStateContext);
  const { stateData } = useContext(DataStateContext);
  const { dispatchData } = useContext(DataDispatchContext);

  const [currentType, setCurrentType] = useState(router.query.type);

  // Get boolean to know if the [type] param of the route has changed. Allows to trigger loadData when navigating on dynamic pages that are already mounted.
  let isThisListInitInStore =
    stateData[currentType] && stateData[currentType].isInit;
  if (currentType !== typeFromRouter) {
    setCurrentType(typeFromRouter);
  }

  /***** TODO: external START*/
  const errorHandler = err => {
    console.log('HANDLER ERROR ALL BY TYPE [type]', err);
    dispatchUI({
      type: 'IS_ERROR',
      payload: { ...err },
    });
  };
  const initList = (messages, type) => {
    dispatchData({
      type: 'INIT_LIST',
      payload: { messages, type },
    });
  };
  async function loadData() {
    dispatchUI({
      type: 'START_LOADING',
    });
    let { type } = router.query;
    await getAllMessagesFromType({ type })
      .then(messages => {
        // init if not already in store
        if (!isThisListInitInStore) {
          initList(messages, type);
        } else {
          dispatchData({
            type: 'UPDATE_LIST',
            payload: { messages, type },
          });
        }
        dispatchUI({
          type: 'END_LOADING',
        });
      })
      .catch(errorHandler);
  }
  // triggered on changing the current type
  useEffect(() => {
    // We are passing by navigation so we need to call the api
    if (!data) {
      loadData().catch(errorHandler);
    }
    // SSR : data is coming from ssr (getInitialProps), we init the list in store if not already initialized
    if (data && !isThisListInitInStore) {
      initList(data, currentType);
    }
    return () => {};
  }, [currentType]);

  if (stateUI?.isError && !stateUI.isLoading) {
    return (
      <div>{stateUI?.isError ? stateUI?.errorMessage : '404 not found'}</div>
    );
  }
  if (stateUI.isLoading) return <p>loading...</p>;

  return (
    <MessagesPage
      headTitle={`✉️ ${currentType}`}
      title={`${currentType} Messages`}
    >
      <MessagesList
        messages={
          stateData[currentType]?.messages?.length
            ? stateData[currentType]?.messages
            : data?.messages
        }
      />
      <CreateMessage
        ctx={{
          isPublic: data?.isPublic || stateData[currentType]?.isPublic,
        }}
      />
    </MessagesPage>
  );
};

export default MessagesByTypePage;

MessagesByTypePage.getInitialProps = async ({ query, req, router, ...ctx }) => {
  if (!req) {
    // client code
    return { data: null };
  }
  // SSR code
  let { type } = query;
  const data = await getAllMessagesFromType({ type }).catch(err =>
    console.log('ERROR SSR ALL FROM TYPE', err)
  );
  return { data };
};

MessagesByTypePage.propTypes = {
  data: PropTypes.object,
};
