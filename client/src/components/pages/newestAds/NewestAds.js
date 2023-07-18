import { ListGroup } from 'react-bootstrap';
import { fetchAds } from '../../../redux/adsRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const NewAds = () => {
  const ads = useSelector((state) => state.ads);
  
  const navigate = useNavigate()

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', separator: '.' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '.');
  };

  const handleSeeMore = (id) => {
    navigate(`/ads/${id}`);
  };

  const sortedAds = [...ads].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="py-5">
      {sortedAds.map((ad) => (
        <div key={ad._id}>
          <ListGroup>
            <ListGroup.Item className="mb-1" action variant="info" onClick={() => handleSeeMore(ad._id)}> Title: {ad.title} Date: {formatDate(ad.date)} </ListGroup.Item>
          </ListGroup>
        </div>
      ))}
    </div>
  );
};

export default NewAds;
