/** This is a custom hook **/

import { useState, useEffect } from "react";



const useFetch = (url) => {
    const [data, setData] = useState([]); 
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(url) //is a promise
            .then((res) => { //res is what we are calling the result of the fetch function which is an object
                //(!res.ok)for errors coming from the server, meaning the status is not 200 
                //cos just the catch alone at the bottom would still return a response object (without this [!res.ok] check)
                //just that the status would not be 200
                if(!res.ok){
                    setError("Failed to fetch")
                    throw Error('Could not fetch the data')
                    
                }

                return res.json(); //we have to parse the json response object into a javascript object
                
            })
            .then((data) => { //what we doing here is firing a function once the json response has been parsed into a javascript object and it takes in as a paramter the data that the .json() method returns
                //console.log(data)
                setData(data);
                setPending(false);
                setError("");
            })//catches any kind of network error and fires a function which takes the error object as a parameter
            .catch((error)=> {
                // console.log(error.message )
                setError(error.message)
                setPending(false)
            })
    }, [url])

    return {data, isPending, error}; //we are returning an object but we could have returned anything, eg. arrat, string, etc.
}
 
export default useFetch;