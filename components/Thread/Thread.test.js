import { render, cleanup } from '@testing-library/react';
import PropTypes from 'prop-types';
import DataProvider from '../../contexts/DataContext';
import UIProvider from '../../contexts/UIContext';
import Thread from './Thread';

import {
  fakeThread,
  fakeThreadParent,
  fakeThreadWithoutMessages,
} from '../../lib/testUtils';

const ContextWrapper = ({ children }) => (
  <DataProvider>
    <UIProvider>{children}</UIProvider>
  </DataProvider>
);

ContextWrapper.propTypes = {
  children: PropTypes.object,
};

describe('<Thread/>', () => {
  afterEach(cleanup);
  it('properly renders the component - snapshot', () => {
    const { asFragment } = render(
      <ContextWrapper>
        <Thread parentMessage={fakeThreadParent} thread={fakeThread} />
      </ContextWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the MessageList', () => {
    const { queryByTestId } = render(
      <ContextWrapper>
        <Thread parentMessage={fakeThreadParent} thread={fakeThread} />
      </ContextWrapper>
    );
    expect(queryByTestId('thread-message-list')).toBeInTheDocument();
  });

  it('should not render the MessageList cause there is no messages', () => {
    const { queryByTestId } = render(
      <ContextWrapper>
        <Thread
          parentMessage={fakeThreadParent}
          thread={fakeThreadWithoutMessages}
        />
      </ContextWrapper>
    );
    expect(queryByTestId('thread-message-list')).not.toBeInTheDocument();
  });

  it('should render a message to start the thread cause there is no messages', () => {
    const { queryByTestId } = render(
      <ContextWrapper>
        <Thread
          parentMessage={fakeThreadParent}
          thread={fakeThreadWithoutMessages}
        />
      </ContextWrapper>
    );
    expect(queryByTestId('start-thread-message')).toBeInTheDocument();
  });

  it('should not render the MessageList cause there is no messages', () => {
    const { queryByTestId } = render(
      <ContextWrapper>
        <Thread
          parentMessage={fakeThreadParent}
          thread={fakeThreadWithoutMessages}
        />
      </ContextWrapper>
    );
    expect(queryByTestId('thread-message-list')).not.toBeInTheDocument();
  });
});
