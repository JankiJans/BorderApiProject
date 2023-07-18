import { Container, Row, Col } from 'reactstrap';
import Ad from '../ad/ad';
import NewAds from '../newestAds/NewestAds';

import AdsSearch from '../search/SearchPage';
import { Button, NavLink } from 'react-bootstrap';

import { getUser } from '../../../redux/usersRedux';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const loggedInUser = useSelector(getUser);

  return (
    <div style={{ backgroundColor: '#7F8487' }}>
      <Container>
        <Row>
          <div className="d-flex align-items-center mt-5 justify-content-between">
            <h1>announcements</h1>
            <AdsSearch />
            <div>
              <NavLink href="/ads/add">
                {loggedInUser && (
                  <Button className="mx-2" variant="warning">
                    ADD AD
                  </Button>
                )}
              </NavLink>
            </div>
          </div>
          <Col xs="8">
            <Ad />
          </Col>
          <Col xs="4">
            <NewAds />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
