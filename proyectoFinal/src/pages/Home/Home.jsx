import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import { FaPlay} from "react-icons/fa";
import { Link } from 'react-router-dom';
import el_marginal_title from "../../../public/el_marginal_title.webp"
import el_marginal_banner from "../../../public/el_marginal_banner.webp"
const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <main>
        <section className="hero">
          <img className="banner-img" src={el_marginal_banner} alt="Banner" />
          <div className="hero-title">
            <img alt="El marginal" className="title-img" src={el_marginal_title} title="El marginal" />
            <p>Un expolicía infiltrado intenta desbaratar una banda que opera desde la cárcel, pero antes deberá manejar los códigos del inframundo para sobrevivir.</p>
            <div className="hero-buttons">
              <Link to={`/player/tv/67166`}>
                <button className='btn'>
                  <FaPlay className='play-btn' size={25} />
                  Reproducir
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="popular-titles">
          <TitleCards category={"movie/popular"} title={"Populares en Netflix"} pageID={2} />
        </section>
        <section className="recommendations">
          <TitleCards title={"Nuestra seleccion de hoy para ti"} pageID={1} category={"movie/top_rated"} />
          <TitleCards title={"Los mas buscados"} pageID={2} category={"movie/upcoming"} />
          <TitleCards title={"Lo nuevo en Netflix"} pageID={2} category={"movie/now_playing"} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
