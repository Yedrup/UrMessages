import PropTypes from 'prop-types';
import { render, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import MessagesList from './MessagesList';
import UserProvider from '../../contexts/UserContext';
import { fakeMessages } from '../../lib/testUtils';

const ContextWrapper = ({ children }) => (
  <UserProvider>{children}</UserProvider>
);

ContextWrapper.propTypes = {
  children: PropTypes.object,
};

afterEach(cleanup);
describe('<MessageList/>', () => {
  it('properly renders the component - snapshot', () => {
    const { asFragment } = render(
      <ContextWrapper>
        <MessagesList messages={fakeMessages} />
      </ContextWrapper>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('It renders the number of given messages', () => {
    render(
      <ContextWrapper>
        <MessagesList messages={fakeMessages} />
      </ContextWrapper>
    );
    const messages = screen.getAllByTestId('message-item');
    expect(messages).toHaveLength(2);
  });

  it('Should not render the component returning null', () => {
    const { container } = render(<MessagesList messages={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
