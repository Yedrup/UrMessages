import { currentFakeDB } from '../../../../fakeServerData/fake-database';

export default async function getAllMessagesFromType(req, res) {
  // TODO: handle Authent for example purpose
  const hasRight = true;
  if (!hasRight) res.status(401).send("You don't have the necessary rights.");

  const methodAllowed = ['POST', 'GET'];
  const isMethodAllowed = methodAllowed.includes(req.method);

  if (!isMethodAllowed) res.status(405).send('This Method is not allowed');

  // Adding the message in the fake DB
  if (req.method === 'POST') {
    // TODO: check what's in there
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
          `404 NOT FOUND - We can't find Messages of type "${req.query.type}"`
        );
    } else {
      res.status(200).json(requestedMessagesByType);
    }
  }
}
