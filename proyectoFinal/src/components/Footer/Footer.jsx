import React from 'react'
import './Footer.css'
import { FaInstagram,FaFacebookF , FaTwitter, FaYoutube} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-icons">
        <a href="https://facebook.com/NetflixLatino/"><FaFacebookF size={25}/></a>
        <a href="https://www.instagram.com/netflix/"><FaInstagram size={25}/></a>
        <a href="https://x.com/NetflixLAT"><FaTwitter size={25}/></a>
        <a href="https://www.youtube.com/@Netflix"><FaYoutube size={25}/></a>
      </div>
      <ul>
        <li>Audio Descriptivo</li>
        <li>Centro de Ayuda</li>
        <li>Tarjetas de regalo</li>
        <li>Prensa</li>
        <li>Relaciones con Inversionistas</li>
        <li>Empleo</li>
        <li>Terminos de uso</li>
        <li>Privacidad</li>
        <li>Avisos legales</li>
        <li>Preferencias de cookies</li>
        <li>Informacion corporativa</li>
        <li>Contactanos</li>
      </ul>
      <span className='copyright-text'>© 1997-2024 Netflix, Inc.</span>
    </footer>
  )
}

export default Footer