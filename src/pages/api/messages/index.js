import { currentFakeDB } from '../../../fakeServerData/fake-database';
// import { USER_TEST_ID } from '../../../../lib/config';

export default async function getAllMessages(req, res) {
  // Check if the method is supported
  const methodAllowed = ['GET'];
  const isMethodAllowed = methodAllowed.includes(req.method);
  if (!isMethodAllowed) res.status(405).send('This Method is not allowed');

  // Return all messages of the type requested
  if (req.method === 'GET') {
    const { messages } = currentFakeDB;
    if (!messages) {
      res.status(404).send('404 - No messages found');
      return;
    }

    res.status(200).json(messages);
  }
}
