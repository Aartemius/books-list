import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchBooks } from "../features/books/booksApi";
import { setIsLoading, sortBooks } from "../features/books/booksSlice";
import BookCard from "./BookCard";
import Sorter from "./Sorter";
import styles from './BooksList.module.scss';
import { debounce } from 'lodash';

const BooksList = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data);
  const { isLoading, books, isLastPage, error } = data;
  const page = useRef(1);

  const loadMore = useRef(
    debounce(() => {
      page.current += 1
      dispatch(fetchBooks(page.current)).then(() => {
        dispatch(setIsLoading(false))
      })
    }, 500)
  ).current;

  const handleScroll = (isLast: boolean) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 10 && 
      !isLoading && !isLast) {
        dispatch(setIsLoading(true));
        loadMore();
    }
  };

  useEffect(() => {
    if (!isLastPage) {
      dispatch(fetchBooks(page.current)).then(() => {
        if (document.documentElement.scrollHeight < window.outerHeight) {
          loadMore();
        }
      })
    }
  }, []);

  useEffect(() => {
    window.onscroll = () => handleScroll(isLastPage);
  }, [isLastPage]);

  useEffect(() => {
    dispatch(sortBooks());
  }, [data, dispatch]);

  return (
    <>
      <div>
        <Sorter />
      </div>
      <div className={ styles.booksList }>
        { books?.map(book => 
          <BookCard key={ book.id } book={book} />
        ) }
        { error && <div>Some error accured</div> }
      </div>
      { isLoading && 
        <img 
          src="/images/icons/Loader.svg" 
          alt="loading" 
          className={ styles.loader }
        /> 
      }
    </>
  )
};

export default BooksList;
