import { useState, useEffect } from "react";

const useFetch = (url, query, page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);

  //FIX: if no result show default data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      //if its initial fetch
      if (query.trim() === "") setImages(data);
      //if its query fetch
      else {
        console.log(data, data.results);
        setImages((prevImages) => [...prevImages, ...data.results]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) setImages([]);
    fetchData();
  }, [url]);

  return { loading, error, images };
};

export default useFetch;
