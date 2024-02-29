import { trimStr } from "./utils.js";

let users = [];

export const findUser = (user) => {
  const userName = trimStr(user.name);
  const userRoom = trimStr(user.room);

  return users.find((user) => trimStr(user.name) === userName && trimStr(user.room) === userRoom);
};

export const addUser = (user) => {
  const isExist = findUser(user);

  !isExist && users.push(user);

  const currentUser = isExist || user;

  return { isExist: !!isExist, user: currentUser };
};

export const removeUser = (user) => {
  const found = findUser(user);

  if (found) {
    users = users.filter(({ room, name }) => room === found.room && name !== found.name);
  }

  return found;
};

export const getRoomUsers = (room) => users.filter((u) => u.room === room);
