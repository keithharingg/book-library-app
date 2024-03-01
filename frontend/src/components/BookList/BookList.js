import { useSelector } from 'react-redux';
import './BookList.css';

const BookList = () => {
  const books = useSelector((state) => state.books); // hook useSelector subscribes on chunk of needed state (books in this variant)

  return (
    <div className="app-block book-list">
      <h2>Books List</h2>
      {books.length === 0 ? (
        <p>No books have been added yet</p>
      ) : (
        <ul>
          {books.map((book, i) => (
            <li key={i}>
              <div>
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
