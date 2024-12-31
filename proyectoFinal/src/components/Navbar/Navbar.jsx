import React, { useEffect, useState, useRef } from 'react';
import './Navbar.css';
import logo from '../../../public/logo.png';
import { FaSearch, FaHome, FaTimes, FaFilm, FaTv } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const clearSearchText = () => {
    setSearchText('');
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchText.trim() !== '') {
      window.location.href = `/browser?search=${searchText}`;
    }
  };

  return (
    <>
      <header>
        <nav ref={navRef} className="navbar">
          <div className="navbar-left">
            <Link className='link' to={"/"}>
              <img src={logo} alt="Logo de Netflix" />
            </Link>
            {!isMobile && (
              <ul>
                <Link to={"/"}><li>Inicio</li></Link>
                <Link to={"/series"}><li>Series</li></Link>
                <Link to={"/movies"}><li>Películas</li></Link>
              </ul>
            )}
          </div>
          <div className="navbar-right">
            {isSearchVisible && (
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Títulos, personas, géneros"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                />
                {searchText && (
                  <span className="clear-btn" onClick={clearSearchText}><FaTimes /></span>
                )}
              </div>
            )}
            <FaSearch className='search-icon' size={23} onClick={handleSearchClick} />
          </div>
        </nav>
      </header>
      {isMobile && (
        <div className="bottom-nav">
          <Link to={"/"}><FaHome className='nav-btn' />Inicio</Link>
          <Link to={"/series"}><FaTv className='nav-btn' />Series</Link>
          <Link to={"/movies"}><FaFilm className='nav-btn' />Peliculas</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
