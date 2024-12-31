import React, { useEffect, useState, useRef } from "react";
import { FaPlay,FaTimes  } from "react-icons/fa";
import "./TitleCards.css";
import axios from "axios";
import { Link } from "react-router-dom";



const TitleCards = ({title, category, pageID}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const BASE_URL = "https://api.themoviedb.org/3/";
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2MyMGQzNmJlNjllYWFmMWU4NDNkYzZhYjljMzVkYyIsIm5iZiI6MTczNTM1NDU0OC4xNDIwMDAyLCJzdWIiOiI2NzZmNjhiNGViNzQyZjQ1ZGU5Mjk1NDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mwi7-2pTdxTNcrodwDwnU78k0-FLcSxq1ZglQQ4ZFco';
  
  const handleWheel = (event) =>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
  }

  const formatAgeRating = (rating) => {

    if (rating === "ATP") {
      return "ATP";
    }
  
    if (rating === "N/A") {
      return "N/A";
    }
  
    if (rating.toLowerCase() === "a" || rating.toLowerCase() === "ai") {
      return "ATP";
    }
  
    const cleanedRating = rating ? rating.replace(/[iaAI]$/, '') : '';
  
    if (!isNaN(cleanedRating) && cleanedRating.length > 0) {
      return `${cleanedRating}+`;
    }
  
    if (cleanedRating.length === 1) {
      return cleanedRating;
    }
  
    return cleanedRating;
  };

  useEffect(() => {
  
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${category}`, {
          params: { language: "es-ES", page: pageID || 1 },
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        });
  
        const cards = response.data.results;
        const cardsWithDetails = await Promise.all(
          cards.map(async (card) => {
            const detailsResponse = await axios.get(
              `${BASE_URL}${tipo}/${card.id}?append_to_response=release_dates&language=es-ES`,
              {
                headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${API_KEY}`,
                },
              }
            );
            
          const releaseDates = detailsResponse.data.release_dates?.results;
          const ageRating =
            releaseDates?.find((item) => item.iso_3166_1 === "ES")
              ?.release_dates[0]?.certification || "N/A";

          const overview = detailsResponse.data.overview;
          const releaseYear = detailsResponse.data.release_date
            ? detailsResponse.data.release_date.split("-")[0]
            : detailsResponse.data.first_air_date 
            ? detailsResponse.data.first_air_date.split("-")[0] 
            : "N/A";
          const genres = detailsResponse.data.genres
            .map((genre) => genre.name)
            .join(", ");
          let runtime = detailsResponse.data.runtime
            ? `${detailsResponse.data.runtime} min`
            : detailsResponse.data.number_of_seasons
            ? `${detailsResponse.data.number_of_seasons} ${detailsResponse.data.number_of_seasons === 1 ? "temporada" : "temporadas"}`
            : "N/A";
          return {
            ...card,
            runtime,
            ageRating: formatAgeRating(ageRating),
            overview,
            releaseYear,
            genres,
          };
        })
      );
  
        setApiData(cardsWithDetails);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
  
    fetchCards();
  
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, [category]);
  

const handleCardClick = (card) => {
  setSelectedCard(card);
};

const closeModal = () => {
  setSelectedCard(null);
};
const determineType = (category) => {
  if (category.includes("movie")) {
    return "movie";
  } else if (category.includes("tv")) {
    return "tv";
  } else {
    return "";
  }
};

const tipo = determineType(category);

  return (
    <>
    <div className="title-cards">
      <h2>{title?title:""}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card)=>{
          return <div 
          className="card" 
          key={card.id}
          onClick={() => handleCardClick(card)}
          >
            <img 
            src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} 
            alt="" />
          </div>
      })}
      </div>
      {selectedCard && (
        <div className="card-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>
              <FaTimes size={25}/>
            </button>
            <img
            className="modal-img" 
            src={`https://image.tmdb.org/t/p/w500/${selectedCard.backdrop_path}`}
            alt={selectedCard.title} 
            />
            <div className="container-modal-info">
              <div className="modal-year-rating">
                <p>{selectedCard.releaseYear}</p>
                {selectedCard && selectedCard.ageRating && selectedCard.ageRating.trim() !== "N/A" && (
                  <p className="age-rating">{selectedCard.ageRating}</p>
                )}
                <p>{selectedCard.genres}</p>
                <p>{selectedCard.runtime}</p>
              </div>
              <div className="modal-title-overview">
                <h2>{selectedCard.title || selectedCard.name}</h2>
                <p>{selectedCard.overview}</p>
              </div>
              
              <Link className="modal-play-btn" to={`/player/${tipo}/${selectedCard.id}`}>
                <button className='btn'>
                <FaPlay size={25}/>
                Reproducir
                </button>
              </Link>
              
            </div>
          </div>
        </div>

      )}
    </div>
    </>
  )
}

export default TitleCards;