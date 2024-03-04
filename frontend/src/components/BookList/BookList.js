import { useDispatch, useSelector } from 'react-redux';
import './BookList.css';
import { removeBook, toggleFavorite } from '../../redux/books/actionCreators';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import {
  selectAuthorFilter,
  selectTitleFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';

const BookList = () => {
  const books = useSelector((state) => state.books); // hook useSelector subscribes on chunk of needed state (books in this variant)
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  const dispatch = useDispatch();
  const removeHandler = (id) => {
    dispatch(removeBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase());
    const matchesOnlyFavorite = onlyFavoriteFilter ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesOnlyFavorite;
  });

  return (
    <div className="app-block book-list">
      <h2>Books list</h2>
      {books.length === 0 ? (
        <p>No books have been added yet.</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div>
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => removeHandler(book.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
