// import { USER_TEST_ID } from '../../../../lib/config';

export default (req, res) => {
  // check if the method is supported
  const methodAllowed = ['POST'];
  const isMethodAllowed = methodAllowed.includes(req.method);
  if (!isMethodAllowed) {
    res.status(405).send('This Method is not allowed');
    return;
  }
  const { userId } = req.body;
  // check if has the authorization
  // console.log({ userId, USER_TEST_ID });
  // if (userId !== USER_TEST_ID) {
  //   res.status(401).send("You don't have the necessary rights.");
  //   return;
  // }
  // NOTE: could add bearer token in cookie and add it into the db

  // return user found
  res.status(200).json({ user: { userId } });
};
