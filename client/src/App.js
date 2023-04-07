import {Routes, Route} from 'react-router-dom';
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import Profile from "./pages/profile";
import EditProfile from "./pages/editProfile";

function App() {
  


  return (

    <div>
      <ToastContainer position="top-center"></ToastContainer>


      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/profile/:id' element={<Profile/>} />
        <Route path='/EditProfile/:id' element={<EditProfile/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
