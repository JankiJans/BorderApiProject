import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/pages/home/HomePage'
import Register from './components/pages/register/RegisterPage'
import Login from './components/pages/login/LoginPage';
import Logout from './components/pages/logut/LogutPage';

//redux imports
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { logIn } from './redux/usersRedux';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
      dispatch(logIn({ login: loggedInUser }));
    }
  }, [dispatch]);

  return (
    <MainLayout>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </MainLayout>
  );
}
export default App;
