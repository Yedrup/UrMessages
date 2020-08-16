import { currentFakeDB } from '../../../fakeServerData/fake-database';
// import { USER_TEST_ID } from '../../../../lib/config';

export default async function getAllMessages(req, res) {
  // Check if the method is supported
  const methodAllowed = ['GET'];
  const isMethodAllowed = methodAllowed.includes(req.method);
  if (!isMethodAllowed) res.status(405).send('This Method is not allowed');

  // const { userId } = req.body;
  // // check if userId is provided
  // if (!userId) {
  //   res.status(400).send('Missing parameters');
  //   return;
  // }

  // check if has the authorization
  // console.log({ userId, USER_TEST_ID });
  // if (userId !== USER_TEST_ID) {
  //   res.status(401).send("You don't have the necessary rights.");
  //   return;
  // }

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
