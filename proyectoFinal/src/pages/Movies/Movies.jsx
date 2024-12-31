import React from 'react'
import "./Movies.css"
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import TitleCards from '../../components/TitleCards/TitleCards'

const Movies = () => {
  return (
    <div className='movies'>
      <Navbar/>
      <main className="list-movies">
        <h1>Peliculas:</h1>
        <TitleCards title={"Tendencias de la semana"} category={"trending/movie/week"} />
        <TitleCards title={"Peliculas para ver en familia"} pageID={1} category={"discover/movie?with_genres=10751"} />
        <TitleCards title={"Peliculas de comedia"} pageID={2} category={"discover/movie?with_genres=35"} />
        <TitleCards title={"Peliculas de accion"} pageID={2} category={"discover/movie?with_genres=28"} />
        <TitleCards title={"Peliculas de drama"} pageID={2} category={"discover/movie?with_genres=18"} />
        <TitleCards title={"Peliculas de terror"} pageID={1} category={"discover/movie?with_genres=27"} />
        <TitleCards title={"Peliculas de ciencia ficcion"} pageID={1} category={"discover/movie?with_genres=878"} />
      </main>
      <Footer/>  
    </div>
  )
}

export default Movies