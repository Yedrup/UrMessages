import { currentFakeDB } from '../../../fakeServerData/fake-database';

export default (req, res) => {
  const messages = currentFakeDB.messages;
  res.status(200).json(messages);
};
