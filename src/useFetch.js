import { useState, useEffect } from "react";

const clientID = `client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const useFetch = (query, page) => {
  console.log("clientID", clientID);
  let url = "";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [defaultImages, setDefaultImages] = useState([]);

  if (query.trim() === "") url = `${mainUrl}?${clientID}`;
  else url = `${searchUrl}?query=${query}&${clientID}&per_page=30&page=${page}`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      //if its initial fetch or no query
      if (query.trim() === "") {
        setImages(data);
        return data;
      }
      //if its no result query
      else if (data.results?.length === 0) setImages(defaultImages);
      else setImages((prevImages) => [...prevImages, ...data.results]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) setImages([]);
    fetchData();
  }, [query, page]);

  useEffect(async () => {
    const defaultImages = await fetchData();
    setDefaultImages(defaultImages);
  }, []);

  return { loading, error, images };
};

export default useFetch;
