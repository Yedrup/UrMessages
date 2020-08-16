import { render, cleanup } from '@testing-library/react';
import PropTypes from 'prop-types';
import UserProvider from '../../contexts/UserContext';
import Message from './Message';

import {
  fakePrivateMessage,
  fakePublicMessage,
  fakeMessageNoThreadAllowed,
} from '../../lib/testUtils';

const ContextWrapper = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);

ContextWrapper.propTypes = {
  children: PropTypes.object,
};

describe('<Message/>', () => {
  afterEach(cleanup);

  it('properly renders the component - snapshot', () => {
    const { asFragment } = render(
      <ContextWrapper>
        <Message message={fakePrivateMessage} />
      </ContextWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('It should not have a thread link cause the threadAllowed is false', () => {
    const { queryByTestId } = render(
      <ContextWrapper>
        <Message message={fakeMessageNoThreadAllowed} />
      </ContextWrapper>
    );
    expect(queryByTestId('thread-link')).not.toBeInTheDocument();
  });

  it('It should display a thread link cause threadAllowed is true', () => {
    const { queryByTestId } = render(
      <ContextWrapper>
        <Message message={fakePublicMessage} />
      </ContextWrapper>
    );
    expect(queryByTestId('thread-link')).toBeInTheDocument();
  });
});
