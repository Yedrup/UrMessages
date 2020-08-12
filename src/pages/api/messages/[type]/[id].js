import { currentFakeDB } from '../../../../fakeServerData/fake-database';
import wait from 'waait';

export default async function getMessageById(req, res) {
  let type = req.body.isPublic ? 'public' : 'private';

  // simulate having the right or not
  const hasRight = true;
  if (!hasRight) res.status(401).send("You don't have the necessary rights.");

  // check if the method is supported
  let methodAllowed = ['POST', 'GET'];
  let isMethodAllowed = methodAllowed.includes(req.method);
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
    if (!messageSearched) {
      res.status(404).send('404 - Message is not found');
    } else {
      res.status(200).json(messageSearched);
    }
  }
}
