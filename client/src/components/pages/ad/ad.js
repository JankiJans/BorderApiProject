import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAds } from '../../../redux/adsRedux';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { IMAGES_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import styles from './ad.module.scss';

const Ad = () => {
  const ads = useSelector((state) => state.ads);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const currentUser = localStorage.getItem('loggedInUser');

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/ads/edit/${id}`);
  };

  const handleRemove = (id) => {
    navigate(`/ads/remove/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', separator: '.' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '.');
  };

  const [hoveredAdId, setHoveredAdId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredAdId(id);
  };

  const handleMouseLeave = () => {
    setHoveredAdId(null);
  };

  return (
    <div className="py-5 d-flex flex-wrap">
      {ads.map((ad) => (
        <div key={ad._id} style={{ width: '16rem' }} className="mx-2 mb-5">
          <Card>
            <div className={`position-relative ${hoveredAdId === ad._id}`} onMouseEnter={() => handleMouseEnter(ad._id)} onMouseLeave={handleMouseLeave}>
              <Card.Img variant="top" src={IMAGES_URL + ad.image} style={{ height: '250px' }} alt="image here" className={styles.overlay} />
              {ad.user.login === currentUser && hoveredAdId === ad._id && (
                <Button variant="warning" className="position-absolute top-50 start-50 translate-middle" onClick={() => handleEdit(ad._id)}>EDIT</Button>
              )}
            </div>
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>{ad.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>{formatDate(ad.date)}</ListGroup.Item>
              <ListGroup.Item>{ad.location}</ListGroup.Item>
              <ListGroup.Item>{ad.user.login}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="warning" type="submit">SEE MORE</Button>
              {ad.user.login === currentUser && (
                <Button variant="danger" type="submit" className="mx-1" onClick={() => handleRemove(ad._id)}>REMOVE</Button>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Ad;
