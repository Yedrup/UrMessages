// import wait from 'waait';
import { currentFakeDB } from '../../../../fakeServerData/fake-database';
// import { USER_TEST_ID } from '../../../../../lib/config';

export default async function getMessageById(req, res) {
  const type = req.body.isPublic ? 'public' : 'private';

  // Check if the method is supported
  const methodAllowed = ['POST', 'GET'];
  const isMethodAllowed = methodAllowed.includes(req.method);
  if (!isMethodAllowed) res.status(405).send('This Method is not allowed');

  // Post message for this route is a thread message treatment cause it's related to a specific message ID
  if (req.method === 'POST') {
    const updatedTypeList = currentFakeDB.updateThreadMessages(type, req.body);
    // await wait(10000);
    res.status(200).json(updatedTypeList);
    return;
  }

  // Return the specific message of the type requested
  if (req.method === 'GET') {
    const messageSearched = currentFakeDB.findMessageById(
      req.query.type,
      req.query.id
    );
    if (!messageSearched.message) {
      return res.status(404).send('404 - Message is not found');
    }
    return res.status(200).json(messageSearched);
  }
}
