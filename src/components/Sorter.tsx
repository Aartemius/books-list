import { useDispatch, useSelector } from "react-redux";
import { 
  toggleSortType, 
  setSortParam, 
  SortParam 
} from "../features/books/booksSlice";
import { useState } from "react";
import { RootState } from "../app/store";
import styles from './Sorter.module.scss';


const Sorter = () => {
  const { allBooks, sortParam } = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const options = Object.values(SortParam);

  const toggleSortOrder = () => {
    dispatch(toggleSortType());
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  }

  return (
    <div className={ styles.contentBlockTopBar }>
      <p>{ allBooks.length } Books</p>
      <div className={ styles.sorterWrap }>
        <div
          onClick={() => toggleSortOrder()}
          className={ styles.togglerWrap }
        >
          <img 
            src="/images/icons/togglerArrows.svg"
            alt="toggle sort order" 
          />
          <p>Sort By</p>
        </div>
        <div className={ styles.dropdownWrap }>
          <div onClick={toggleDropdown} className={ styles.dropdownCurrent }>
            { !sortParam ? 'chose' : sortParam }
            <img 
              src={ isDropdownVisible ? "/images/icons/dropdownUp.svg" : "/images/icons/dropdownDown.svg" } 
              alt="chose sort parameter" 
            />
          </div>
          { isDropdownVisible &&
            <ul 
              onClick={ () => setIsDropdownVisible(false) } 
              className={ styles.dropdown }
            >
              { options.map(option => (
                <li
                  key={option}
                  onClick={ () => dispatch(setSortParam(option)) }
                >
                  {option}
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </div>
  );
}

export default Sorter;