import { currentFakeDB } from '../../../../fakeServerData/fake-database';
// import { USER_TEST_ID } from '../../../../../lib/config';

export default async function getAllMessagesFromType(req, res) {
  // Check if the method is supported
  const methodAllowed = ['POST', 'GET'];
  const isMethodAllowed = methodAllowed.includes(req.method);
  if (!isMethodAllowed) res.status(405).send('This Method is not allowed');

  // const { userId } = req.body;
  // // check if userId is provided
  // if (!userId) {
  //   res.status(400).send('Missing parameters');
  //   return;
  // }
  // // check if has the authorization
  // console.log({ userId, USER_TEST_ID });
  // if (userId !== USER_TEST_ID) {
  //   res.status(401).send("You don't have the necessary rights.");
  //   return;
  // }

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
