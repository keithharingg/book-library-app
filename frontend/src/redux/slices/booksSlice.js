import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

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
});

export const { addBook, removeBook, toggleFavorite } = booksSlice.actions;

export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
