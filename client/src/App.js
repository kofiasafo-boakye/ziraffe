import {Routes, Route} from 'react-router-dom';
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home";
import Profile from "./pages/profile";
import EditProfile from "./pages/editProfile";
import Search from './pages/search';
import CreatePost from './pages/createPost';
import SearchedUser from './pages/searchedUser';
import AddComment from './pages/addComment';
// import Navbar from './components/navbar';

function App() {
  


  return (

    <div>
      {/* <Navbar></Navbar> */}
      <ToastContainer position="top-center"></ToastContainer>


      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/profile/:id' element={<Profile/>} />
        <Route path='/addComment/:id' element={<AddComment/>} />
        <Route path='/profile/EditProfile/:id' element={<EditProfile/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/createPost' element={<CreatePost/>} />
        <Route path='/search/searchedUser/:id' element={<SearchedUser/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
