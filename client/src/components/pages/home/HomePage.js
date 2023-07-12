import { Container, Row, Col } from 'reactstrap';
import Ad from '../ad/ad';

import { Button, NavLink, Form } from 'react-bootstrap';

import { getUser } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';

const HomePage = () => {

  const loggedInUser = useSelector(getUser);


  return (
    <div style={{ backgroundColor: '#7F8487' }}>
    <Container>
      <Row>
        <Col className='mt-5' xs='8'>
          <div className='d-flex align-items-center mt-5 justify-content-between'>
            <h1>announcements</h1>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            <div>
            <NavLink href="/ads/add">
            {loggedInUser &&<Button className='mx-2' variant='warning'>ADD AD</Button>}
            </NavLink>
            </div>
          </div>
          <Ad/>
        </Col>
      </Row>
      <Row>
        <Col className='mt-5' xs='4'>
        </Col>
      </Row>
    </Container>
  </div>
  )
};

export default HomePage;
