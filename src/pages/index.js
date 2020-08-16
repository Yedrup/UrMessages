import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  DataStateContext,
  DataDispatchContext,
} from '../../contexts/DataContext';
import { UserStateContext } from '../../contexts/UserContext';
import { UIDispatchContext } from '../../contexts/UIContext';
import MessagesHome from './messages';
import { getAllMessages } from '../../lib/data-treatment-service';

const Home = ({ pageProps }) => {
  const { data } = pageProps;
  const { stateData } = useContext(DataStateContext);
  const { stateUser } = useContext(UserStateContext);
  const { dispatchData } = useContext(DataDispatchContext);
  const { dispatchUI } = useContext(UIDispatchContext);
  const { isStoreInit } = stateData;

  const lastPublicMessage =
    stateData?.public?.messages[stateData?.public?.messages?.length - 1];

  const lastPrivateMessage =
    stateData?.private?.messages[stateData?.private?.messages?.length - 1];

  // SSR rendering, initialize store lists with the data
  if (!isStoreInit && data) {
    dispatchData({
      type: 'INITIALIZE_ALL_LISTS_TYPES',
      payload: { ...data },
    });
  }

  useEffect(() => {
    // When navigating the data is set to null inside getInitialProps
    // Init the store with public messages
    const errorHandler = err => {
      dispatchUI({
        type: 'IS_ERROR',
        payload: { ...err },
      });
    };

    async function loadData() {
      dispatchUI({
        type: 'START_LOADING',
      });
      await getAllMessages({ userId: stateUser?.userId })
        .then(result => {
          // Initialize all the lists in store
          dispatchData({
            type: 'INITIALIZE_ALL_LISTS_TYPES',
            payload: { ...result },
          });
          dispatchUI({
            type: 'END_LOADING',
          });
        })
        .catch(errorHandler);
    }

    if (!data) {
      loadData().catch(errorHandler);
    }
    return () => {};
    // eslint-disable-next-line
  }, [lastPublicMessage, lastPrivateMessage]);

  return (
    <MessagesHome
      lastPublicMessage={lastPublicMessage}
      lastPrivateMessage={lastPrivateMessage}
    />
  );
};

export default Home;

Home.getInitialProps = async function({ req }) {
  // Client code
  if (!req) {
    return { data: null };
  }
  // SSR code
  const data = await getAllMessages().catch(err =>
    console.log('SSR ERROR 📃 HOME PAGE', err)
  );
  return { data };
};

Home.propTypes = {
  data: PropTypes.object,
  pageProps: PropTypes.object,
};
