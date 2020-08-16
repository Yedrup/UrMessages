import {
  getAllMessagesAPI,
  getSingleMessageByIdAPI,
  getAllMessagesFromTypeAPI,
  postMessageAPI,
  connectAPI,
  disconnectAPI,
} from './api';

const getAllMessages = () => {
  const resp = getAllMessagesAPI();
  return resp;
};

const getAllMessagesFromType = ({ type }) => {
  const resp = getAllMessagesFromTypeAPI({ type });
  return resp;
};

const getSingleMessageById = ({ type, id }) => {
  const resp = getSingleMessageByIdAPI({ type, id });
  return resp;
};

const postMessage = ({ message }) => {
  const resp = postMessageAPI({ message });
  return resp;
};

const connect = credentials => {
  const resp = connectAPI(credentials);
  return resp;
};
const disconnect = credentials => {
  const resp = disconnectAPI(credentials);
  return resp;
};

export {
  getAllMessages,
  getSingleMessageById,
  getAllMessagesFromType,
  postMessage,
  connect,
  disconnect,
};
