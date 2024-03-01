import * as a from './actionTypes';

export const addBook = (newBook) => {
  return {
    type: a.ADD_BOOK,
    payload: newBook,
  };
};

export const removeBook = (id) => {
  return {
    type: a.REMOVE_BOOK,
    payload: id,
  };
};
