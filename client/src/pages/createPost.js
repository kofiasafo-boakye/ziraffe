import Navbar from "../components/navbar";
import { useState, useEffect, useRef} from "react"
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import {BACKEND_API} from "../api/backend_api"
import {toast} from "react-toastify"
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";
import useFetch from "../hooks/useFetch";



// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';


const CreatePost = () => {
    // const [image, setImage] = useState('')
    const [caption, setCaption] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const imageInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const navigate = useNavigate()
    const USER_ID = getStoredIdFromLocalStorage()
    

    const {data: user} = useFetch(`${BACKEND_API}/user/profile/${USER_ID}`)

    console.log(user)

    useEffect (() => {
        if(!USER_ID){
            navigate('/')
        }
    }, [])



    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
          setSelectedImage(selectedFile);
    
          const reader = new FileReader();
          reader.onload = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(selectedFile);
        }
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
        // console.log(caption)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!selectedImage || !caption){
            console.log(selectedImage, caption)
            toast.error("Please fill all fields")
        }
        else{
            const sId = getStoredIdFromLocalStorage()
            const formData = new FormData()
            formData.append('userId',sId)
            formData.append('caption',caption)
            formData.append('image',selectedImage)
            formData.append('firstName',user.firstName)
            formData.append('lastName',user.lastName)
            formData.append('username',user.username)
            formData.append('profilePicture',user.profilePicture)

            // setIsPending(true)
            console.log(formData.get('userId'))
            console.log(formData.get('caption'))
            console.log(formData.get('image'))
            console.log(formData.get('firstName'))
            console.log(formData.get('lastName'))
            console.log(formData.get('username'))
            console.log(formData.get('profilePicture'))

            Axios.post(`${BACKEND_API}/post/`, 
                formData
            )
            .then((response) => {
                setIsPending(false)
                console.log(response)

                toast.success("Post successful")
                navigate(`/home`)
                
            })
            .catch((err) => {toast.error(err.message)});




            // setImagePreview(null);
            // //add set image to null
            // setCaption('');
            // if (imageInputRef.current) {
            //     imageInputRef.current.value = '';
            // }
        }
    

    };

    const handleClearImage = () => {
        setImagePreview(null);
        setSelectedImage(null)
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    };
    
    return (      
        <div>
            <Navbar></Navbar>
            Post

            <form action="" encType="multipart/form-data">
                <label htmlFor="">Select a photo</label>
                    <input type="file" onChange={handleImageChange} ref={imageInputRef} required/>
                        {imagePreview && (
                            <div>
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px' }} />
                            <button type="button" onClick={handleClearImage}>Clear</button>
                            </div>
                        )}
                <label htmlFor="">Enter Caption</label>
                    <input type="text" name = "caption" required onChange={handleCaptionChange} value={caption}/>
                <br />
                {isPending && <button >Posting...</button>}
                {/* <button onClick={handleSubmit}>Post</button> */}
                {!isPending && <button onClick={handleSubmit}>Post</button>}

            
            </form>
        </div>
    );
}
 
export default CreatePost;