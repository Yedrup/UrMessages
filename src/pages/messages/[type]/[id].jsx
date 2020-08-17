import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  getSingleMessageById,
  getAllMessagesFromType,
} from '../../../../lib/data-treatment-service';
import {
  UIDispatchContext,
  UIStateContext,
} from '../../../../contexts/UIContext';
import {
  DataStateContext,
  DataDispatchContext,
} from '../../../../contexts/DataContext';
import { findObjectByPropInArr } from '../../../../lib/utils/utils';
import Message from '../../../../components/Message/Message';
import Thread from '../../../../components/Thread/Thread';
import ProtectedWrapper from '../../../../components/ProtectedWrapper';

const SingleMessagePage = ({ pageProps }) => {
  const { message, thread, SSRErr } = pageProps;
  const router = useRouter();
  const { dispatchUI } = useContext(UIDispatchContext);
  const { stateUI } = useContext(UIStateContext);
  const { stateData } = useContext(DataStateContext);
  const { dispatchData } = useContext(DataDispatchContext);

  let { type, id } = router.query;
  const [singleMessage, setSingleMessage] = useState(message);
  const [singleMessageThread, setSingleMessageThread] = useState(thread);
  const [error, setError] = useState(SSRErr);

  const handleError = err => {
    dispatchUI({
      type: 'IS_ERROR',
    });
    setError(err);
  };

  // Function to get this specific message from store
  const getThisMessageFromStore = () => {
    let thisTypeList = stateData[type];
    const messageSearched = findObjectByPropInArr(
      thisTypeList.messages,
      'id',
      id
    );
    const threadSearched = findObjectByPropInArr(
      thisTypeList.threads,
      'parentId',
      id
    );
    if (!messageSearched) {
      let err = new Error('Message not found! 😕');
      throw err;
    }
    return { messageSearched, threadSearched };
  };

  // Init store with this list type
  const initStore = async () => {
    dispatchUI({
      type: 'START_LOADING',
    });
    try {
      const result = await getAllMessagesFromType({ type });
      dispatchData({
        type: 'INIT_LIST',
        payload: { messages: result, type },
      });
    } catch (err) {
      handleError(err);
    }
    dispatchUI({
      type: 'END_LOADING',
    });
  };

  // Manage error coming from SSR
  useEffect(() => {
    if (SSRErr) {
      handleError(SSRErr);
    }
    return () => {};
  }, []);

  // Triggered on modification from current list type in Store
  useEffect(() => {
    // If the store is not init for this type list, we fetch it to store it and use it.
    if (!stateData[type].messages.length || !stateData[type].isInit) {
      initStore();
    }
    // Find the message and its thread (if it exists) in the store to save it in this state
    try {
      let { messageSearched, threadSearched } = getThisMessageFromStore();
      setSingleMessage(messageSearched);
      setSingleMessageThread(threadSearched);
    } catch (err) {
      handleError(err);
    }
    return () => {};
  }, [stateData[type]]);

  /* If thread is allowed for this message, we display thread component , if it's not allowed, we just display the Single Message component */
  return (
    <ProtectedWrapper>
      {stateUI?.isLoading && <p>Loading...</p>}
      {!singleMessage && (
        <div>
          {stateUI?.isError && error?.customMessage
            ? error?.customMessage
            : error?.message
            ? error?.message
            : '404 not found'}
        </div>
      )}
      {singleMessage?.isThreadAllowed ? (
        <Thread parentMessage={singleMessage} thread={singleMessageThread} />
      ) : (
        <Message message={singleMessage} />
      )}
    </ProtectedWrapper>
  );
};

export default SingleMessagePage;

SingleMessagePage.getInitialProps = async ({ query, req, error, ...ctx }) => {
  // Client code
  if (!req) {
    return { message: null, thread: null };
  }

  // SSR code
  let { id, type } = query;
  let SSRErr = null;
  const data = await getSingleMessageById({
    type,
    id,
  }).catch(err => {
    SSRErr = { ...err };
  });

  if (!data?.message) return { message: null, thread: null, SSRErr };
  return { message: data?.message, thread: data?.thread, SSRErr: null };
};

SingleMessagePage.propTypes = {
  message: PropTypes.object,
  thread: PropTypes.object,
  SSRErr: PropTypes.object,
};
