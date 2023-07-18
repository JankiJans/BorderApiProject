import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../config';
import { getAdById, editAd, fetchAds } from '../../../redux/adsRedux';
import EditAdd from './addEdit';
import { Alert } from 'react-bootstrap';

const EditAds = () => {
  const [ status, setStatus] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  // const ads = useSelector((state) => state.ads);
  const adData = useSelector((state) => getAdById(state, id));
  console.log(adData)

  const handleSubmit = (ad) => {
    const fd = new FormData();
    fd.append('title', ad.title);
    fd.append('description', ad.description);
    fd.append('date', ad.date);
    fd.append('price', ad.price);
    fd.append('location', ad.location);
    fd.append('image', ad.image);
    fd.append('user', ad.user);

    const options = {
      method: 'PUT',
      body: fd,
      credentials: 'include',
    };

    fetch(`${API_URL}/api/ads/${id}`, options)
      .then((res) => {
        if (res.status === 200) {
          setStatus('succes')
          dispatch(editAd({ ...adData, id }));
          setTimeout(() => navigate('/'), 2000);
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        setStatus('serverError');
      });
  };

  return (
    <>
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your announcement has been successfully added!</p>
        </Alert>
      )}

      {status === 'clientError' && (
        <Alert variant="danger">
          <Alert.Heading>Not enough data or data are incorrect</Alert.Heading>
          <p>You have to fill all the fields. Photo has to be one of this type of file: *.jpg, *.jpeg, *.gif, *.png.</p>
        </Alert>
      )}

      {status === 'serverError' && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      <EditAdd
        action={handleSubmit}
        actionText="Edit ad"
        price={adData.price}
        title={adData.title}
        location={adData.location}
        description={adData.description}
        date={adData.date}
        image={adData.image}
      />
    </>
  );
};

export default EditAds;
