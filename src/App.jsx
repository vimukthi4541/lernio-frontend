import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />
        
       
        <Route path="/login" element={<Login />} />
        
        
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;