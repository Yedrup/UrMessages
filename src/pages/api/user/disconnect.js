export default (req, res) => {
  // check if the method is supported
  const methodAllowed = ['POST'];
  const isMethodAllowed = methodAllowed.includes(req.method);
  if (!isMethodAllowed) {
    res.status(405).send('This Method is not allowed');
    return;
  }
  // check if userId
  const { userId } = req.body;
  if (!userId) {
    res.status(400).send('You are not signed in.');
    return;
  }

  // Could remove the bearer token from the cookie and from the db
  return res.status(200).json({ message: 'successfully disconnected!' });
};
