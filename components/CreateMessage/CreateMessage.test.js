import { render, cleanup } from '@testing-library/react';
import PropTypes from 'prop-types';
import DataProvider from '../../contexts/DataContext';
import UIProvider from '../../contexts/UIContext';
import UserProvider from '../../contexts/UserContext';
import CreateMessage from './CreateMessage';

const ContextWrapper = ({ children }) => (
  <UserProvider>
    <DataProvider>
      <UIProvider>{children}</UIProvider>
    </DataProvider>
  </UserProvider>
);

ContextWrapper.propTypes = {
  children: PropTypes.object,
};

const fakeCtx = {
  id: '1234',
  isPublic: false,
  parentId: '9876',
};

describe('<CreateMessage/>', () => {
  afterEach(cleanup);

  it('properly renders the component - snapshot', () => {
    const { asFragment } = render(
      <ContextWrapper>
        <CreateMessage ctx={fakeCtx} />
      </ContextWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
