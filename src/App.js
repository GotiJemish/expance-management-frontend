import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigate, Route ,Routes } from'react-router-dom';
import Homepage from './pages/homepage';
import Register from './pages/register';
import Login from './pages/login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Tablemy from './pages/homepage';


function App() {
  return (
    <>
    <Routes>
    
      <Route path='/' element={
      <ProtectedRouts>
        
        <Homepage/>
      </ProtectedRouts>
    } />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/table' element={<Tablemy/>} />
      
    </Routes>
    </>
  );
}

export function ProtectedRouts(props) {
  if (localStorage.getItem('user')) {
    return props.children
  } else {
    return <Navigate to="/login" />
  }
}

export default App;
