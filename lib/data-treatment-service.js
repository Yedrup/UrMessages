import {
  getAllMessagesAPI,
  getSingleMessageByIdAPI,
  getAllMessagesFromTypeAPI,
  postMessageAPI,
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

export {
  getAllMessages,
  getSingleMessageById,
  getAllMessagesFromType,
  postMessage,
};
