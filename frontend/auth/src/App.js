import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <h1>hello world</h1>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
        {/* Optional: Redirect root to login or home */}
        {/* <Route path='/' element={<Navigate to='/login' />} /> */}
      </Routes>
    </div>
  );
}

export default App;
