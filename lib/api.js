import fetch from 'isomorphic-fetch';
import { API_ENDPOINT_DEV } from './config';

const callAPI = async (url, opt = {}) => {
  // console.log('callAPI --- url', url);
  try {
    const response = await fetch(url, opt);
    if (response.ok) {
      const data = await response.json();
      // console.log('callAPI --- data', data);
      return data;
    }
    // create an error
    const error = new Error(response.statusText);
    error.customMessage = await response.text();
    throw error;
  } catch (error) {
    // console.log('callAPI --- error', error);
    throw error;
  }
};

const getAllMessagesAPI = () => {
  const resp = callAPI(`${API_ENDPOINT_DEV}/api/messages`);
  return resp;
};

const getAllMessagesFromTypeAPI = ({ type }) => {
  const resp = callAPI(`${API_ENDPOINT_DEV}/api/messages/${type}`);
  return resp;
};

const getSingleMessageByIdAPI = ({ type, id }) => {
  const resp = callAPI(`${API_ENDPOINT_DEV}/api/messages/${type}/${id}`, {});
  return resp;
};

const postMessageAPI = ({ message }) => {
  let messageType = message.isPublic ? 'public' : 'private';
  let resp;
  let isAThread = !!message.parentId;
  // remove the possibility to create a thread of a thread message so far
  if (isAThread) message.isThreadAllowed = false;
  const options = {
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (!isAThread) {
    resp = callAPI(`${API_ENDPOINT_DEV}/api/messages/${messageType}`, options);
  } else {
    resp = callAPI(
      `${API_ENDPOINT_DEV}/api/messages/${messageType}/${message.id}`,
      options
    );
  }
  return resp;
};

export {
  getAllMessagesAPI,
  getSingleMessageByIdAPI,
  getAllMessagesFromTypeAPI,
  postMessageAPI,
};
