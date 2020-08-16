import PropTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';
import DataProvider from '../../contexts/DataContext';
import UIProvider from '../../contexts/UIContext';
import UserProvider from '../../contexts/UserContext';
import Page from '../containers/Page';
import '../../public/nprogress.css';
import 'simplebar/dist/simplebar.min.css';

// Display progress bar on changing route

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

// This default export is required in a new `pages/_app.js` file.
export default function MyApp(props) {
  const { Component, ...pageProps } = props;
  return (
    <UIProvider>
      <UserProvider>
        <DataProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </DataProvider>
      </UserProvider>
    </UIProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
