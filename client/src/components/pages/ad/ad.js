import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAds } from '../../../redux/adsRedux';
import { Card, ListGroup, Button, NavLink } from 'react-bootstrap';
import { IMAGES_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';


const Ad = () => {
  const ads = useSelector(state => state.ads);
  const dispatch = useDispatch();

  const navigate = useNavigate()
  const currentUser = localStorage.getItem('loggedInUser');
  console.log(currentUser)

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/ads/edit/${id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', separator: '.' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '.');
  };  

  console.log(ads)
  return (
    <div className='py-5 d-flex'>
      {ads.map((ad) => (
        <Card key={ad._id} style={{ width: '18rem' }} className='mx-2'>
          <Card.Img variant="top" src={IMAGES_URL + ad.image} alt='image here' />
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
            {ad.user.login === currentUser && <NavLink href="/removeAd"><Button variant="danger" type="submit" className='mx-1'>REMOVE</Button></NavLink>}
            {ad.user.login === currentUser &&<Button variant="warning" type="submit" onClick={() => handleEdit(ad._id)}>EDIT</Button>}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Ad;
