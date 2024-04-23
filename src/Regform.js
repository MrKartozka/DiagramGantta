import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

function RegFormRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default RegFormRoutes;
