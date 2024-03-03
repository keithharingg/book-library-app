import { useDispatch, useSelector } from 'react-redux';
import {
  selectTitleFilter,
  setTitleFilter,
  resetFilters,
  selectAuthorFilter,
  setAuthorFilter,
} from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);

  const handleTitleFilter = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  const handleAuthorFilter = (e) => {
    dispatch(setAuthorFilter(e.target.value));
  };
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            value={titleFilter}
            onChange={handleTitleFilter}
            type="text"
            placeholder="Filter by title..."
          />
        </div>
        <div className="filter-group">
          <input
            value={authorFilter}
            onChange={handleAuthorFilter}
            type="text"
            placeholder="Filter by author..."
          />
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
