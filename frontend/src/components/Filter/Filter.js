import { useDispatch, useSelector } from 'react-redux';
import { selectTitleFilter, setTitleFilter, resetFilters } from '../../redux/slices/filterSlice';
import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const titleFilter = useSelector(selectTitleFilter);
  const handleTitleFilter = (e) => {
    dispatch(setTitleFilter(e.target.value));
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
          <button type="button" onClick={handleResetFilters}>
            Reset filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
