import casual from 'casual-browserify';
import faker from 'faker';
import formatDate from './date';

// Util Method to generate array
const getArrayOf = (casualGenFunc, { count, ...opt }) =>
  [...Array(count)].map(() => casualGenFunc(opt));

const optionsGenDefault = {
  isPublic: false,
  isThreadAllowed: false,
  count: 3,
};

// Define a new generator type fakeMessage
casual.define('fakeMessage', function({
  isPublic = optionsGenDefault.isPublic,
  isThreadAllowed = optionsGenDefault.isThreadAllowed,
}) {
  return {
    id: casual.uuid,
    user: casual.uuid,
    isPublic,
    isThreadAllowed,
    title: casual.title,
    date: formatDate(faker.date.recent()),
    content: casual.words(),
  };
});

// Return array of fake messages
const createFakeMessages = ({
  isPublic = optionsGenDefault.isPublic,
  count = optionsGenDefault.count,
  isThreadAllowed = optionsGenDefault.isThreadAllowed,
}) => {
  const messages = getArrayOf(casual._fakeMessage, {
    count,
    isPublic,
    isThreadAllowed,
  });
  return { messages };
};

const createFakeThread = ({ isPublic, ...props }) => {
  const { messages } = createFakeMessages({ isPublic, ...props });
  return {
    id: casual.uuid,
    type: 'thread',
    messages,
    isPublic,
    title: casual.title,
    content: casual.words(),
  };
};

export { createFakeMessages, createFakeThread };
