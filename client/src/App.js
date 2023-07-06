import { Routes, Route } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout/MainLayout';

import Home from './components/pages/home/HomePage'
import Register from './components/pages/register/RegisterPage'

function App() {
  return (
    <MainLayout>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </MainLayout>
  );
}
export default App;
