import { API_URL } from "../../../config";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { addAd } from "../../../redux/adsRedux";
// import { getUser } from "../../../redux/usersRedux";

import { Form, Alert, Spinner, Button } from "react-bootstrap";

const AdAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('')
  const [status, setStatus] = useState(null);

  const currentUser = localStorage.getItem('loggedInUser');
  console.log(currentUser)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('price', price);
    fd.append('location', location);
    fd.append('date', date)
    fd.append('image', image);
    fd.append('user', currentUser);

    const options = {
      method: 'POST',
      credentials: "include",
      body: fd,
    }

    setStatus('loading');
      fetch(`${API_URL}/api/ads`, options)
      .then(res => {
     
      if (res.status === 200) {
        setStatus('success');
        // setTimeout(() => {
        //     navigate('/');
        // }, 3000);

      } else if (res.status === 400) {
        setStatus('clientError');

      } else if (res.status === 409) {
        setStatus('loginError');

      } else {
        setStatus('serverError');
      }
    })
    .catch (err => { 
      setStatus('serverError');
    })
  };

  return (
    <Form className="col-12 col-sm-6 mx-auto mb-3" onSubmit={handleSubmit}>

      <div className="mx-auto w-100">
        <div className="my-4 text-center">
            <h3>Add announcement</h3>
        </div>
      </div>

      { status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your announcement has been successfully added!</p>
        </Alert>
      )}

      { status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>Not enough data or data are incorrect</Alert.Heading>
          <p>You have to fill all the fields. Photo has to be one of this type of file: *.jpg, *.jpeg, *.gif, *.png.</p>
        </Alert>
      )}

    { status === "loginError" && (
      <Alert variant="warning">
        <Alert.Heading>Login already in use</Alert.Heading>
        <p>You have to use other login</p>
      </Alert>
    )}

      { status === "loading" && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading..</span>
        </Spinner>
      )}

    { status === "serverError" && (
      <Alert variant="danger">
        <Alert.Heading>Something went wrong...</Alert.Heading>
        <p>Unexpected error... Try again!</p>
      </Alert>
    )}
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title" />      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" as="textarea" rows={5} value={description} onChange={e => setDescription(e.target.value)} placeholder="Content" />      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} placeholder="Enter date" />      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLocation">
        <Form.Label>Location</Form.Label>
        <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />      
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhoto">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" onChange={e => setImage(e.target.files[0])} />      
      </Form.Group>

      <Button variant="warning" type="submit">Submit</Button>
    </Form>
  )
}

export default AdAdd
