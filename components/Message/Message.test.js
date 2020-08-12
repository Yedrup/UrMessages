import { render, cleanup } from '@testing-library/react';

import Message from './Message';

import {
  fakePrivateMessage,
  fakePublicMessage,
  fakeMessageNoThreadAllowed,
} from '../../lib/testUtils';

describe('<Message/>', () => {
  afterEach(cleanup);

  it('properly renders the component - snapshot', () => {
    const { asFragment } = render(<Message message={fakePrivateMessage} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('It should not have a thread link cause the threadAllowed is false', () => {
    const { queryByTestId } = render(
      <Message message={fakeMessageNoThreadAllowed} />
    );
    expect(queryByTestId('thread-link')).not.toBeInTheDocument();
  });

  it('It should display a thread link cause threadAllowed is true', () => {
    const { queryByTestId } = render(<Message message={fakePublicMessage} />);
    expect(queryByTestId('thread-link')).toBeInTheDocument();
  });
});
