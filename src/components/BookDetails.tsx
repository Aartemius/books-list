import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { pushBookToViewedStorage } from '../utils/common';
import styles from './BookDetails.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const BookDetails = () => {
  const { id } = useParams();
  const { allBooks } = useSelector((state: RootState) => state.data);
  const currentBook = allBooks.find(book => book.id === Number(id));

  useEffect(() => {
    if (id) {
      pushBookToViewedStorage(id);
    }
  });

  return (
    <>
      { currentBook &&
        <div className={ styles.detailsContainer }>
          <div className={ styles.imageSide }>
            <div className={ styles.imageWrap }>
              <img src={ currentBook.cover } alt={ `image of ${ currentBook.title }` } />
            </div>
            <div className={ styles.titleContent }>
              <p>Downloads: </p>
              <p>{ currentBook.downloads }</p>
            </div>
          </div>
          <div className={ styles.textContentSide }>
            <div className={ styles.titleContent }>
              <p>Title: </p>
              <p>{ currentBook.title }</p>
            </div>
            <div className={ styles.titleContent }>
              <p>Author: </p>
              <p>{ currentBook.author }</p>
            </div>
            <div className={ styles.titleContent }>
              <p>Rating: </p>
              <p>{ Math.round(Number(currentBook.rate)).toString() } / 5</p>
            </div>
            <div className={ styles.titleContent }>
              <p>Description: </p>
              <p>{ currentBook.description }</p>
            </div>
            <div className={ styles.titleContent }>
              <p>Reader Reviews</p>
              <p>{ currentBook.reader_reviews.map(review => (
                <span key={review.review}>
                  <span>{ review.review }</span><br />
                  <span>{ `${ review.name }, ${ review.age }` }</span><br />
                </span>
              )) }</p>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default BookDetails;