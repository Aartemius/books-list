import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks, fetchAllBooks } from './booksApi';

export enum SortParam {
  title = 'title',
  popularity = 'popularity',
  newest = 'newest',
  author = 'author'
}

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  rate: number;
  release_date: number;
  description: string;
  downloads: number;
  reader_reviews: { 
    name: string; 
    review: string; 
    age: number 
  }[];
}

const booksSlice = createSlice({
  name: 'data',
  initialState: {
    isLoading: false,
    books: [] as Book[],
    error: undefined as string | undefined,
    sortParam: undefined as unknown as SortParam | null,
    sortType: 'asc',
    isLastPage: false,
    allBooks: [] as Book[],
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    toggleSortType: (state) => {
      state.sortType = state.sortType === 'asc' ? 'desc' : 'asc';
    },
    setSortParam: (state, action) => {
      state.sortParam = action.payload;
    },
    sortBooks: (state) => {
      const { sortType, sortParam, books } = state;

      switch (sortParam) {
        case SortParam.title:
          books.sort((a, b) => {
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            return sortType === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
          });
          break;

        case SortParam.author:
          books.sort((a, b) => {
            const nameA = a.author.toUpperCase();
            const nameB = b.author.toUpperCase();
            return sortType === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
          });
          break;

        case SortParam.popularity:
          books.sort((a, b) => {
            return sortType === 'asc' ? a.rate - b.rate : b.rate - a.rate;
          });
          break;

        case SortParam.newest:
          books.sort((a, b) => {
            const dateA = new Date(a.release_date).getTime();
            const dateB = new Date(b.release_date).getTime();
            return sortType === 'asc' ? dateA - dateB : dateB - dateA;
          });
          break;

        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        console.error(action.error.message);
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
        if (state.books.length >= state.allBooks.length) {
          state.isLastPage = true;
        }
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.allBooks = action.payload;
      })
  },
});

export const { 
  sortBooks,
  toggleSortType, 
  setSortParam,
  setIsLoading
} = booksSlice.actions;
export default booksSlice.reducer;
