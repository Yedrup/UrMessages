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

const SingleMessagePage = ({ pageProps }) => {
  const { message, thread } = pageProps;

  const router = useRouter();
  let { type, id } = router.query;

  const { dispatchUI } = useContext(UIDispatchContext);
  const { stateUI } = useContext(UIStateContext);
  const { stateData } = useContext(DataStateContext);
  const { dispatchData } = useContext(DataDispatchContext);

  const [singleMessage, setSingleMessage] = useState(message);
  const [singleMessageThread, setSingleMessageThread] = useState(thread);

  // function to get this specific message from store
  const getThisMessage = () => {
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
    return { messageSearched, threadSearched };
  };

  // init store with this list
  const initStore = async () => {
    dispatchUI({
      type: 'START_LOADING',
    });
    await getAllMessagesFromType({ type })
      .then(result => {
        dispatchData({
          type: 'INIT_LIST',
          payload: { messages: result, type },
        });
        dispatchUI({
          type: 'END_LOADING',
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    // If the store is not init for this type list, we fetch it to store it and use it.
    if (!stateData[type].messages.length || !stateData[type].isInit) {
      initStore();
    }

    // find the message and its thread (if it exists) in the store to save it in this state
    let { messageSearched, threadSearched } = getThisMessage();
    setSingleMessage(messageSearched);
    setSingleMessageThread(threadSearched);
    return () => {};
  }, [stateData[type]]);

  if (stateUI.isLoading) return <p>Loading...</p>;
  if (stateUI.isError || !singleMessage)
    return (
      <div>{stateUI?.isError ? stateUI?.errorMessage : '404 not found'}</div>
    );

  // depending on if the thread is allow for a message we display a thread component or just the Message component
  if (singleMessage?.isThreadAllowed) {
    return (
      <Thread parentMessage={singleMessage} thread={singleMessageThread} />
    );
  } else {
    return <Message message={singleMessage} />;
  }
};

export default SingleMessagePage;

SingleMessagePage.getInitialProps = async ({ query, req, ...ctx }) => {
  // client code
  if (!req) {
    return { message: null, thread: null };
  }

  // SSR code
  let { id, type } = query;
  const { message, thread } = await getSingleMessageById({
    type,
    id,
  }).catch(err => console.log('SSR HANDLER ERROR PAGE [type][id] PAGE', err));

  if (!message) return { message: null, thread: null };
  return { message, thread };
};

SingleMessagePage.propTypes = {
  message: PropTypes.object,
  thread: PropTypes.object,
};
