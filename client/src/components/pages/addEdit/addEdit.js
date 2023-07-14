import React from 'react';
import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';

const EditAdd = ({ action, actionText, ...props }) => {

  const id = props.id;
  const [title, setTitle] = useState(props.title || '');
  const [location, setLocation] = useState(props.location || '');
  const [price, setPrice] = useState(props.price || '');
  const [description, setDescription] = useState(props.description || '');
  const [date, setDate] = useState(props.date || '');
  const [image, setImage] = useState(props.image || '');

  const handleSubmit = (e) => {
    e.preventDefault()

    if (description && date) {
      action({
        price,
        title,
        description,
        date,
        location,
        id,
        image,
      });
    }
  }

  return (
    <Form className="col-12 col-sm-6 mx-auto mb-3" onSubmit={handleSubmit}>

      <div className="mx-auto w-100">
        <div className="my-4 text-center">
            <h3>Edit announcement</h3>
        </div>
      </div>
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
};

export default EditAdd;
