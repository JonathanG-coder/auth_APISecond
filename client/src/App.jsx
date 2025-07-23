import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import Register from './components/pages/Register.jsx';
import Login from './components/pages/Login.jsx';
import Dashboard from './components/pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element=<Register /> />
          <Route path="/login" element=<Login /> />
          <Route path="/dashboard" element=<PrivateRoute><Dashboard /></PrivateRoute> />
          <Route path="*" element=<Login /> />
        </Routes>
      </Router>
    </AuthProvider>
  );
}