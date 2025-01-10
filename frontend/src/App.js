
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';



function App() {
  return (
   <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
   </div>
  );
}

export default App;
