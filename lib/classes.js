import casual from 'casual-browserify';
import { v4 as uuidv4 } from 'uuid';
import formatDate from './utils/date';
// import faker from 'faker';

export class MessageClass {
  constructor({
    parentId = null,
    user = uuidv4(),
    isPublic = false,
    isThreadAllowed = true,
    users = null,
    title = casual.title,
    content = casual.words(),
  }) {
    const dateNow = Date.now();
    this.id = uuidv4();
    this.parentId = parentId;
    this.user = user;
    this.isPublic = isPublic;
    this.isThreadAllowed = isThreadAllowed;
    this.users = users;
    this.title = title;
    this.content = content;
    this.dataInMs = dateNow;
    this.date = formatDate(dateNow); // TODO:  remove it, dateInMs is enough and more flexible
  }
}
