import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
console.log(`?client_id=${process.env.REACT_APP_ACCESS_KEY}`);

function App() {
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${mainUrl}`);
      const data = await response.json();
      setImages(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input type="text" className="form-input" />
          <button className="submit_btn">
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
      </section>
    </main>
  );
}

export default App;
