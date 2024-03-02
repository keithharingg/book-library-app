import { useDispatch, useSelector } from 'react-redux';
import './BookList.css';
import { addBook, removeBook } from '../../redux/books/actionCreators';

const BookList = () => {
  const books = useSelector((state) => state.books); // hook useSelector subscribes on chunk of needed state (books in this variant)
  const dispatch = useDispatch();
  const removeHandler = (id) => {
    dispatch(removeBook(id));
  };

  return (
    <div className="app-block book-list">
      <h2>Books List</h2>
      {books.length === 0 ? (
        <p>No books have been added yet.</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={book.id}>
              <div>
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
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
