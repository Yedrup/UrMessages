// import { USER_TEST_ID } from '../../../../lib/config';

export default (req, res) => {
  // Check if the method is supported
  const methodAllowed = ['POST'];
  const isMethodAllowed = methodAllowed.includes(req.method);
  if (!isMethodAllowed) {
    res.status(405).send('This Method is not allowed');
    return;
  }
  const { userId } = req.body;
  // Return user found
  res.status(200).json({ user: { userId } });
};
