import { currentFakeDB } from '../../../../fakeServerData/fake-database';
// import { USER_TEST_ID } from '../../../../../lib/config';

export default async function getAllMessagesFromType(req, res) {
  // Check if the method is supported
  const methodAllowed = ['POST', 'GET'];
  const isMethodAllowed = methodAllowed.includes(req.method);
  if (!isMethodAllowed) res.status(405).send('This Method is not allowed');

  // Adding the message in the fake DB
  if (req.method === 'POST') {
    const type = req.body.isPublic ? 'public' : 'private';
    const updatedList = currentFakeDB.updateMessages(type, req.body);
    res.status(200).json(updatedList);
    return;
  }

  // Return the type requested
  if (req.method === 'GET') {
    const requestedMessagesByType = currentFakeDB.getMessagesByType(
      req.query.type
    );

    if (!requestedMessagesByType) {
      res
        .status(404)
        .send(
          `404 NOT FOUND - There is no Messages of type "${req.query.type}"`
        );
    } else {
      res.status(200).json(requestedMessagesByType);
    }
  }
}
