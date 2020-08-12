import { render, cleanup } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import MessagesList from './MessagesList';
import { fakeMessages } from '../../lib/testUtils';

afterEach(cleanup);
describe('<MessageList/>', () => {
  it('properly renders the component - snapshot', () => {
    const { asFragment } = render(<MessagesList messages={fakeMessages} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('It renders the number of given messages', () => {
    render(<MessagesList messages={fakeMessages} />);
    const messages = screen.getAllByTestId('message-item');
    expect(messages).toHaveLength(2);
  });

  it('Should not render the component returning null', () => {
    const { container } = render(<MessagesList messages={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
