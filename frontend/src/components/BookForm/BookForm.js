import React, { useState } from 'react';
import './BookForm.css';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addBook } from '../../redux/books/actionCreators';
import booksData from '../../data/books.json';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch(); // sends actionCreator to reducer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      const book = {
        title,
        author,
        id: uuidv4(),
      };
      // dispatch action
      dispatch(addBook(book));
      setTitle('');
      setAuthor('');
    }
  };
  const addRandomBookHandler = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = { ...booksData[randomIndex], id: uuidv4() };
    dispatch(addBook(randomBook));
  };
  return (
    <div className="app-block book-form">
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmit} action="">
        <div>
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add book</button>
        <button type="button" onClick={addRandomBookHandler}>
          Add random book
        </button>
      </form>
    </div>
  );
};

export default BookForm;
