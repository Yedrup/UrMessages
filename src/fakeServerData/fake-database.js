import publicMessages from './publicMessages';
import privateMessages from './privateMessages';
import { findObjectByPropInArr } from '../../lib/utils/utils';
// This is a fake db, all updates are lost on restarting the project or on hard refreshing. It's a user session information.

class FakeDB {
  constructor() {
    this.messages = {
      private: privateMessages,
      public: publicMessages,
    };
  }
}

FakeDB.prototype.updateMessages = function(type, newValue) {
  this.messages[type].messages = [...this.messages[type].messages, newValue];
  // Return the message created
  return this.messages[type];
};

FakeDB.prototype.updateThreadMessages = function(type, newMessageValue) {
  const listWhereToSearch = this.messages[type].threads;
  const threadSearched = this.searchThread(type, newMessageValue.parentId);

  // Create the thread if it doesn't exist
  if (!threadSearched) {
    // Add the message to existing thread
    this.messages[type].threads = [
      ...this.messages[type].threads,
      {
        parentId: newMessageValue.parentId,
        id: newMessageValue.id,
        isPublic: newMessageValue.isPublic,
        messages: [newMessageValue],
      },
    ];
  } else {
    // Update this thread messages to add the new message
    const updateThreadSearched = { ...threadSearched };
    updateThreadSearched.messages = [
      ...updateThreadSearched.messages,
      newMessageValue,
    ];
    // Find index to update the threads array
    const threadToModifyIndex = listWhereToSearch.findIndex(
      currThread => currThread.parentId === newMessageValue.parentId
    );

    // Remove the old thread state from threads and add the updated version
    this.messages[type].threads = [
      ...this.messages[type].threads.slice(0, threadToModifyIndex),
      updateThreadSearched,
      ...this.messages[type].threads.slice(threadToModifyIndex),
    ];
  }
  return this.messages[type];
};

FakeDB.prototype.findMessageById = function(type, id) {
  const listWhereToSearch = this.messages[type].messages;
  const messageSearched = findObjectByPropInArr(listWhereToSearch, 'id', id);

  // Find and return the related thread if it exists
  const thread = this.searchThread(type, id);
  if (!messageSearched) return { message: null, thread: null };
  if (messageSearched && !thread)
    return { message: messageSearched, thread: null };
  return { message: messageSearched, thread };
};

FakeDB.prototype.getMessagesByType = function(type) {
  return this.messages[type];
};

FakeDB.prototype.searchThread = function(type, parentMessageId) {
  const listWhereToSearch = this.messages[type].threads;
  const threadSearched = findObjectByPropInArr(
    listWhereToSearch,
    'parentId',
    parentMessageId
  );
  return threadSearched;
};

export const currentFakeDB = new FakeDB();
