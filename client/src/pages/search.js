import Navbar from "../components/navbar";
import { useState} from "react";
import axios from "axios";
import {toast} from "react-toastify"
import {BACKEND_API} from "../api/backend_api"
import { Link } from "react-router-dom";


const Search = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

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
            Search Page

            <input type="text" value={searchQuery} onChange={handleChange} placeholder="Find users..."/>
            <div>
                {
                    searchResults.map((result) => (
                        <Link to={`/search/searchedUser/${result._id}`}>
                        <li key={result._id}>{result.firstName}</li>
                        </Link>
                    ))
                }
            </div>
        
        </div>
     );
}
 
export default Search;