import { Form, Card, Col, Row, Button, Alert } from 'react-bootstrap';
import { getAdById } from '../../../redux/adsRedux';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { removeAd } from '../../../redux/adsRedux';
import { API_URL } from '../../../config';
import { useState } from 'react';

const RemoveAd = () => {
  const [status, setStatus] = useState('');

  const { id } = useParams();
  const adData = useSelector((state) => getAdById(state, id));

  const currentUser = localStorage.getItem('loggedInUser');

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleDelete = (e) => {
    e.preventDefault();

    const options = {
      method: 'DELETE',
      credentials: "include"
    };

    fetch(`${API_URL}/api/ads/${id}`, options)
      .then(res => {
        if (res.status === 200) {
          setStatus('success');
          dispatch(removeAd(adData));
          setTimeout(() => {
            navigate('/')
          }, 2500);
        }
        else {
          setStatus('failed');
        }
      })
      .catch(err => {
        console.error(err);
        setStatus('failed');
      });
  }

  return (
    <Form className="col-12 col-sm-6 mx-auto mb-3">
      <div className="mx-auto w-100">
        <div className="my-4 text-center">
          <h3>Delete announcement</h3>
        </div>
      </div>

      { status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your announcement has been successfully deleted!</p>
        </Alert>
      )}

      { status === "failed" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong!</Alert.Heading>
          <p>Please try again later...</p>
        </Alert>
      )}

    <div className="d-flex justify-content-center">
      <Card bg="danger" text="white" style={{ width: '20rem' }} className="mb-2">
        <Card.Header>Dear {currentUser}</Card.Header>
        <Card.Body>
          <Card.Title>Are you sure that you want to delete this announcement?</Card.Title>
          <Card.Text>title: {adData.title}</Card.Text>
          <Card.Text>description: {adData.description}</Card.Text>
          <Card.Text>date: {adData.date}</Card.Text>
          <Card.Text>price: {adData.price}</Card.Text>
          <Card.Text>location: {adData.location}</Card.Text>
        </Card.Body>
      </Card>
      </div>
      <Row className="justify-content-center mt-3">
        <Col xs="auto">
          <Button variant="outline-danger" onClick={e => handleDelete(e)}>Confirm</Button>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" href='/'>Decline</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RemoveAd;
