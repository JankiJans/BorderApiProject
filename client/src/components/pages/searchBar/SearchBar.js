import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { searchUpdate } from '../../../redux/searchStringRedux';
import { Form } from 'react-bootstrap';

const SearchForm = () => {
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchUpdate(searchString));
  };

  useEffect(() => {
    dispatch(searchUpdate(searchString));
  }, [searchString, dispatch]);

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </Form>
  );
};

export default SearchForm;
