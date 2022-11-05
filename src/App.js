import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import useFetch from "./useFetch";
import Photo from "./Photo";

//TODO: use some memo functioality to prevent rerendering on text input change

function App() {
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const { images } = useFetch(query, page);

  const findImages = (e) => {
    e.preventDefault();
    setQuery(text);
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
    // setPage((prev) => prev + 1);
  }, [handleObserver]);

  return (
    <main>
      <section className="search">
        <form action="" className="search-form" onSubmit={findImages}>
          <input
            type="text"
            className="form-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
