import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handlescucess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const [loggedinuser, setloggedinuser] = useState('');
  const navigate = useNavigate();

  // Redirect if user is not logged in
  useEffect(() => {
    const user = localStorage.getItem('loggedinuser');
    if (!user) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      setloggedinuser(user);
    }
  }, [navigate]);

  const handlelogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedinuser');
    setloggedinuser(''); // Clear state immediately
    handlescucess('User logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div>
      <h1>{loggedinuser ? `Welcome, ${loggedinuser}` : 'Loading...'}</h1>
      <button onClick={handlelogout}>Logout</button>
      <ToastContainer />
    </div>
  );
};

export default Home;
