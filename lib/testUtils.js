const fakePrivateMessage = {
  id: 'e0f17993-697b-4807-88b9-93e139396ddc',
  parentId: null,
  user: '1677f769-8fb5-41b1-aa42-9110379a1717',
  isPublic: false,
  isThreadAllowed: true,
  users: null,
  title: 'Molestias molestias',
  date: 'Sunday, August 2, 2020, 1:02:01 PM',
  content: 'reiciendis asperiores tempore enim earum velit consequatur',
};

const fakePublicMessage = {
  id: '5a707960-1c54-4bde-a5b9-c83a3318b24a',
  parentId: null,
  user: '91d979ae-2ea2-4c8b-932f-156299a2f8bb',
  isPublic: true,
  isThreadAllowed: true,
  users: null,
  title: 'Dolorem perferendis in',
  date: 'Sunday, August 2, 2020, 7:30:15 AM',
  content: 'vero architecto doloribus exercitationem aut veritatis eveniet',
};

const fakeMessageNoThreadAllowed = {
  id: '934badde862-ddb7-4b9d-83fe-555c8734be4e',
  user: '55ac9363-267a-40bd-93b0-23cdb7dcb390',
  parentId: 'cb15ac13-d1da-4e37-8045-35571fdc4e5d',
  isPublic: true,
  isThreadAllowed: false,
  title: 'Dolorem perferendis in',
  date: 'Sunday, August 2, 2020, 9:45:30 PM',
  content: 'vero architecto doloribus exercitationem aut veritatis eveniet',
};

const fakeMessages = [
  {
    id: '9f72b5e2-9cee-4003-8356-ad48745579be',
    parentId: null,
    user: 'e33c94de-8c4d-44d8-95bf-8d491a82846a',
    isPublic: true,
    isThreadAllowed: true,
    users: null,
    title: 'Architecto alias saepe',
    date: 'Sunday, August 2, 2020, 4:05:31 AM',
    content: 'ea aperiam quia nam commodi quam incidunt',
  },
  {
    id: '5a707960-1c54-4bde-a5b9-c83a3318b24a',
    parentId: null,
    user: '91d979ae-2ea2-4c8b-932f-156299a2f8bb',
    isPublic: true,
    isThreadAllowed: true,
    users: null,
    title: 'Dolorem perferendis in',
    date: 'Sunday, August 2, 2020, 7:30:15 AM',
    content: 'vero architecto doloribus exercitationem aut veritatis eveniet',
  },
];

const fakeThreadParent = {
  id: 'c4b1e9e2-0ca6-4a84-b6e5-538241f1b447',
  parentId: null,
  user: '1677f769-8fb5-41b1-aa42-9110379a1717',
  isPublic: false,
  isThreadAllowed: true,
  title: 'Lorem ipsum dolor sit amet consectetur',
  users: ['55ac9363-267a-40bd-93b0-23cdb7dcb390'],
  date: 'Sunday, August 2, 2020, 1:47:56 PM',
  content:
    'Doloremque tenetur dolore iure nisi quidem laudantium, hic earum necessitatibus',
  threadId: '29711c6d-fe5a-4908-8094-ba31e102b28d',
};

const fakeThread = {
  parentId: 'c4b1e9e2-0ca6-4a84-b6e5-538241f1b447',
  id: '29711c6d-fe5a-4908-8094-ba31e102b28d',
  isPublic: false,
  messages: [
    {
      id: '934bae862-bbb7-4b9d-83fe-555c8734be4e',
      parentId: '29711c6d-fe5a-4908-8094-ba31e102b28d',
      user: '1677f769-8fb5-41b1-aa42-9110379a1717',
      isPublic: false,
      isThreadAllowed: false,
      title: 'Delectus itaque dolores',
      date: 'Sunday, August 2, 2020, 9:35:52 PM',
      content: 'odio illo possimus veniam qui ratione nihil',
    },
  ],
};

const fakeThreadWithoutMessages = {
  parentId: 'c4b1e9e2-0ca6-4a84-b6e5-538241f1b447',
  id: '29711c6d-fe5a-4908-8094-ba31e102b28d',
  isPublic: false,
  messages: [],
};

export {
  fakeMessageNoThreadAllowed,
  fakePublicMessage,
  fakePrivateMessage,
  fakeMessages,
  fakeThread,
  fakeThreadParent,
  fakeThreadWithoutMessages,
};
