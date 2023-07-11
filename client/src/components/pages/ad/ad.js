import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAds, getAdById } from '../../../redux/adsRedux';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { IMAGES_URL } from '../../../config';


const Ad = () => {
  const ads = useSelector(state => state.ads);
  const dispatch = useDispatch();

  const currentUser = localStorage.getItem('loggedInUser');
  console.log(currentUser)

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

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
            <ListGroup.Item>{ad.date}</ListGroup.Item>
            <ListGroup.Item>{ad.location}</ListGroup.Item>
            <ListGroup.Item>{ad.user.login}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Button variant="warning" type="submit">SEE MORE</Button>
            {ad.user.login === currentUser && <Button variant="danger" type="submit" className='mx-1'>REMOVE</Button>}
            {ad.user.login === currentUser &&<Button variant="warning" type="submit">EDIT</Button>}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Ad;
