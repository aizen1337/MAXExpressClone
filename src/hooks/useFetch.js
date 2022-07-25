import { useState, useEffect } from "react";
const useFetch = (url) => {
    const[data, setData] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const[error, setError] = useState(null)
    useEffect(() => {
        fetch(url)
        .then(async res => {
            if(!res.ok) {
                throw Error('Failed to fetch the data')
            }
            const data = await res.json();
            setData(data);
            setIsLoading(false);
            setError(null);
        }).catch(error => {
            setIsLoading(false);
            setError(error.message);
        })
    }, [url]);
    return {
        data , isLoading , error 
    }
}
export default useFetch;