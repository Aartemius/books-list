import { FC } from "react";
import styles from './BookCard.module.scss';
import { Link } from 'react-router-dom';
import { isBookViewed } from "../utils/common";
import { Book } from "../features/books/booksSlice";
import { useInView } from "react-intersection-observer";

export interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  const {
    id,
    title,
    author,
    cover,
    rate
  } = book;

  const isViewed = isBookViewed(id);

  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <Link 
      to={ `/book/${ id }` }
      className={`${styles.bookCard} ${inView ? styles.inView : ''}`}
      id={ id.toString() }
      ref={ref}
    >
      <div className={ styles.coverWrap }>
        <img src={ cover } alt={ title }  className={ styles.coverImage }/>
        {inView && (
          <img 
            src={ isViewed ? '/images/icons/viewed.svg' : '/images/icons/notViewed.svg' }
            alt={ `view ${ title }` }
            className={ styles.isViewedIcon }
          />
        )}
      </div>
      <p className={ styles.author }>{ author }</p>
      <p className={ styles.title }>{ title }</p>
      <p className={ styles.rate }>{ Math.round(Number(rate)).toString() } / 5</p>
    </Link>
  );
}

export default BookCard;
