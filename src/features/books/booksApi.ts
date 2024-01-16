import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllBooks = createAsyncThunk('data/fetchAllBooks', async () => {
  const response = await fetch('/books.json');
  const data = await response.json();
  return data;
});

export const fetchBooks = createAsyncThunk('data/fetchBooks', async (page: number) => {
  const booksPerPage = 10;
  const response = await fetch('/books.json');
  const data = await response.json();
  const books = data.length > page * booksPerPage ? data.slice(0, page * booksPerPage) : data

  return books;
});
