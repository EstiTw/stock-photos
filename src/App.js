import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import useFetch from "./useFetch";
import Photo from "./Photo";

// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [url, setUrl] = useState(`${mainUrl}?${clientID}`);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const { loading, error, images } = useFetch(url, query, page);

  const findImages = (e) => {
    e.preventDefault();
    if (query.trim() === "") setUrl(`${mainUrl}?${clientID}`);
    else {
      setUrl(
        `${searchUrl}?query=${query}&${clientID}&per_page=10&page=${page}`
      );
    }
    setPage(1);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <main>
      <section className="search">
        <form action="" className="search-form" onSubmit={findImages}>
          <input
            type="text"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="submit_btn" onClick={findImages}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {images.map((img) => (
            <Photo key={img.id} {...img} />
          ))}
        </div>
        <div ref={loader} />
      </section>
    </main>
  );
}

export default App;
