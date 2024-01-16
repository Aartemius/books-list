import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';
import { fetchAllBooks } from '../features/books/booksApi';

const store = configureStore({
  reducer: {
    data: booksReducer,
  },
});

store.dispatch(fetchAllBooks());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;