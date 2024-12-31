import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import { FaPlay, FaTimes } from "react-icons/fa";
import "./Browser.css";

const Browser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [location]);

  useEffect(() => {
    if (searchQuery) {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2MyMGQzNmJlNjllYWFmMWU4NDNkYzZhYjljMzVkYyIsIm5iZiI6MTczNTM1NDU0OC4xNDIwMDAyLCJzdWIiOiI2NzZmNjhiNGViNzQyZjQ1ZGU5Mjk1NDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mwi7-2pTdxTNcrodwDwnU78k0-FLcSxq1ZglQQ4ZFco'
        }
      };

      fetch(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&language=es-US`, options)
        .then(res => res.json())
        .then(data => {
          const filteredResults = data.results.filter(item => item.poster_path);
          setResults(filteredResults);
        })
        .catch(err => console.error('Error fetching data:', err));
    }
  }, [searchQuery]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Navbar />
      <main className='browser'>
        <h1>Resultados de búsqueda para: <br />
          {searchQuery}
        </h1>
        <div className="results">
          {results.length > 0 ? (
            results.map((item, index) => (
              <div
                className="card"
                key={index}
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <p className='card-title-p'>{item.title || item.name}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron resultados con imagen de fondo.</p>
          )}
        </div>

        {selectedItem && (
          <div className="card-modal">
            <div className="modal-content">
              <button className="close-btn" onClick={closeModal}>
                <FaTimes size={25} />
              </button>
              <img
                className="modal-img"
                src={`https://image.tmdb.org/t/p/w500${selectedItem.backdrop_path || selectedItem.poster_path}`}
                alt={selectedItem.title || selectedItem.name}
              />
              <div className="container-modal-info">
                <div className="modal-year-rating">
                  <p>{selectedItem.release_date?.split('-')[0] || selectedItem.first_air_date?.split('-')[0] || "N/A"}</p>
                  <p>{selectedItem.media_type === 'movie' ? 'Película' : 'Serie'}</p>
                </div>
                <div className="modal-title-overview">
                  <h2>{selectedItem.title || selectedItem.name}</h2>
                  <p>{selectedItem.overview || "Descripción no disponible."}</p>
                </div>

                <Link className="modal-play-btn" to={`/player/${selectedItem.media_type}/${selectedItem.id}`}>
                  <button className='btn'>
                    <FaPlay size={25} />
                    Reproducir
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Browser;
