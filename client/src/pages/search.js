import Navbar from "../components/navbar";
import { useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify"
import {BACKEND_API} from "../api/backend_api"
import { Link, useNavigate } from "react-router-dom";
import { getStoredIdFromLocalStorage } from "../helpers/localStorageUtils";



const Search = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const navigate = useNavigate()
    const sId = getStoredIdFromLocalStorage()

    useEffect (() => {
        if(!sId){
            navigate('/')
        }
    }, [])


    const handleSearch = async (query) => {
        try{
            const response = await axios.get(`${BACKEND_API}/user/searchUser`,
            {
                params: {
                    query: query
                }
            })
            setSearchResults(response.data)
            console.log("response:",response)
            console.log("response.data:",response.data)
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }

    const handleChange = (event) => {
        const query = event.target.value 
        setSearchQuery(query)

        if(query.trim() === ''){
            setSearchResults([])
        }
        else{
            handleSearch(query)
        }
        
    }

    return ( 

        <div>
            <Navbar></Navbar>
            <div className="search">
                <h2 style={{ textAlign: "center" }} className="header">Find Users</h2>
                <br />
                <div className="searchInput">
                    <input type="text" value={searchQuery} onChange={handleChange} placeholder="Find users..."/>
                </div>
                <div className="searchResults">
                    {
                        searchResults.map((result) => (
                            <Link to={`/search/searchedUser/${result._id}`} key={result._id} style={{textDecoration: 'none', color: 'gray'}}>
                                <div className="align-searchResults">
                                    <div className="left-element"><img src={`http://localhost:5000/uploads/${result.profilePicture}`} alt=" " style={{width: '30px', height: '30px'}}/></div>
                                    <div className="right-elements">
                                        <div className="firstName">{result.firstName + " " + result.lastName}</div>
                                        <div className="username">@{result.username}</div>
                                    </div>
                                </div>
                            
                            </Link>
                            
                        ))
                    }
                </div>
            </div>
        
        </div>
     );
}
 
export default Search;