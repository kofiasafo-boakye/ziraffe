import { useState } from "react";
import {Routes, Route, Router} from 'react-router-dom';
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";

function App() {
  


  return (

    <div>
      <ToastContainer position="top-center"></ToastContainer>


      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
