import React, { useEffect, useState } from 'react';
import './Player.css';
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Player = () => {
  const { tipo, id } = useParams(); // Obtenemos el ID desde la URL
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({ key: "" });
  const BASE_URL = "https://api.themoviedb.org/3/";
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlY2MyMGQzNmJlNjllYWFmMWU4NDNkYzZhYjljMzVkYyIsIm5iZiI6MTczNTM1NDU0OC4xNDIwMDAyLCJzdWIiOiI2NzZmNjhiNGViNzQyZjQ1ZGU5Mjk1NDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mwi7-2pTdxTNcrodwDwnU78k0-FLcSxq1ZglQQ4ZFco';

  useEffect(() => {

    const fetchCard = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${tipo}/${id}/videos?language=en`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          }
        });
        
        if (res.data.results.length > 0) {
          setApiData(res.data.results[0]);
        } else {
          console.log("No trailer found for this movie.");
        }
    
      } catch (error) {
        console.error("Error fetching trailer: ", error);
      }
    };
    fetchCard();
  }, []);

  return (
    <div className='player'>
      <FaArrowCircleLeft
        size={40}
        className='back-btn'
        onClick={() => {
          const currentPath = window.location.pathname;
          navigate(-1);

          setTimeout(() => {
            const newPath = window.location.pathname;
            if (newPath === currentPath) {
              navigate(-1);
            }
          }, 100);
        }}
      />
      {tipo == "tv" && id == 67166 ? (
        <iframe 
        width="90%" 
        height="90%" 
        src={`https://www.youtube.com/embed/mN7xQF3hO1M`} 
        title='trailer' 
        frameBorder="0" 
        allowFullScreen
      />
      ) : apiData.key ? (
        <iframe 
          width="90%" 
          height="90%" 
          src={`https://www.youtube.com/embed/${apiData.key}`} 
          title='trailer' 
          frameBorder="0" 
          allowFullScreen
        />
      ) : (
        <p>Cargando el trailer...</p>
      )}
    </div>
  );
};

export default Player;
