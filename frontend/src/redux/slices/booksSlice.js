import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWithId from '../../utils/createBookWithId';
import { selectError, setError } from './errorSlice';

const initialState = [];

export const fetchBook = createAsyncThunk('books/fetchBook', async (url, thunkAPI) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    thunkAPI.dispatch(setError(error.message));
    throw error;
  }
});

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload];
    },
    removeBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      return state.map((book) =>
        book.id === action.payload ? { ...book, isFavorite: !book.isFavorite } : book,
      );
    },
  },

  // OPTION 1
  // extraReducers: {
  //   [fetchBook.fulfilled]: (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       state.push(createBookWithId(action.payload, 'API'));
  //     }
  // },

  // OPTION 2
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWithId(action.payload, 'API'));
      }
    });
  },
});

export const { addBook, removeBook, toggleFavorite } = booksSlice.actions;
export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
