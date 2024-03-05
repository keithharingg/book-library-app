import React, { useState } from 'react';
import './BookForm.css';
import { useDispatch } from 'react-redux';
import { addBook, fetchBook } from '../../redux/slices/booksSlice';
import booksData from '../../data/books.json';
import createBookWithId from '../../utils/createBookWithId';
import { setError } from '../../redux/slices/errorSlice';
import { FaSpinner } from 'react-icons/fa';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState();
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch(); // sends actionCreator to reducer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author) {
      // dispatch action
      dispatch(addBook(createBookWithId({ title, author }, 'manual')));
      setTitle('');
      setAuthor('');
    } else {
      dispatch(setError('You must fill in the fields!'));
    }
  };
  const addRandomBookHandler = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithId(randomBook, 'random')));
  };

  const addRandomBookAPIHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
    } finally {
      setIsLoading(false);
    }
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

        <button type="button" onClick={addRandomBookAPIHandler} disabled={isLoading}>
          {isLoading ? (
            <>
              <span>Loading book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add random via API'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
