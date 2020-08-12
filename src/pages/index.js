import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  DataStateContext,
  DataDispatchContext,
} from '../../contexts/DataContext';
import { UIDispatchContext, UIStateContext } from '../../contexts/UIContext';
import MessagesHome from './messages';
import { getAllMessages } from '../../lib/data-treatment-service';

const Home = ({ pageProps }) => {
  const { data } = pageProps;
  const { stateData } = useContext(DataStateContext);
  const { dispatchData } = useContext(DataDispatchContext);
  const { dispatchUI } = useContext(UIDispatchContext);
  const { stateUI } = useContext(UIStateContext);
  const { isStoreInit } = stateData;

  // init the store with public messages
  const errorHandler = err => {
    console.log('ERROR HANDLER 📃 INDEX PAGE  ====>', err);
    dispatchUI({
      type: 'IS_ERROR',
      payload: { ...err },
    });
  };

  async function loadData() {
    dispatchUI({
      type: 'START_LOADING',
    });
    await getAllMessages()
      .then(data => {
        // initialize all the lists in store
        dispatchData({
          type: 'INITIALIZE_ALL_LISTS_TYPES',
          payload: { ...data },
        });
        dispatchUI({
          type: 'END_LOADING',
        });
      })
      .catch(errorHandler);
  }

  // ssr rendering, initialize store lists with the data
  if (!isStoreInit && data) {
    dispatchData({
      type: 'INITIALIZE_ALL_LISTS_TYPES',
      payload: { ...data },
    });
  }

  useEffect(() => {
    // when navigating the data is set to null inside getInitialProps
    if (!data) {
      loadData().catch(errorHandler);
    }
    return () => {};
  }, []);

  return (
    <div>
      <h1>Welcome on UrMess@ges!</h1>
      <MessagesHome />
    </div>
  );
};

export default Home;

Home.getInitialProps = async function({ query, req }) {
  // client code
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
};
