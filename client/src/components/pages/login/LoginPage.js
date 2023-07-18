import {Button, Form, Alert, Spinner} from 'react-bootstrap'
import { useState } from 'react'
import { API_URL } from '../../../config'

import { useDispatch } from 'react-redux'
import { logIn } from '../../../redux/usersRedux'

import { useNavigate } from 'react-router-dom'


const Login = () => {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password})
    }
    setStatus('loading')
    fetch(`${API_URL}/auth/login`, options)
      .then(res => {
        if(res.status === 200) {
          setStatus('success')
          dispatch(logIn({ login }))
          navigate('/')
        } else if(res.status === 400) {
          setStatus('clientError')
        } else {
          setStatus('serverError')
        }
      })
      .catch(err => {
        setStatus('serverError')
      })
  }


  return (
    <Form className="col-12 col-sm-3 mx-auto" onSubmit={handleSubmit}>
      <h1 className='py-5'>login</h1>

      {status === "success" && (
          <Alert variant='success'>
            <Alert.Heading>You are in!</Alert.Heading>
            <p>You have been successful logged in!</p>
          </Alert>
      )}

      {status === "serverError" && (
        <Alert variant='danger'>
          <Alert.Heading>Something went wrong!</Alert.Heading>
          <p>Unexpected error please try again</p>
        </Alert>
      )}

      {status === "clientError" && (
        <Alert variant='danger'>
          <Alert.Heading>Incorrect</Alert.Heading>
          <p>Login or password are Incorrect</p>
        </Alert>
      )}

      {status === "loginError" && (
        <Alert variant='warning'>
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login</p>
        </Alert>
      )}

      {status === "loading" && (
        <Spinner animation="border" role="status" className="block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className='mb-3' controlId='formLogin'>
        <Form.Label>Login</Form.Label>
        <Form.Control type='text' placeholder='Enter login' value={login} onChange={e => setLogin(e.target.value)}/>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

      <Button variant='warning' type='submit' className='mb-5'>Log in</Button>

    </Form>
    )
}

export default Login