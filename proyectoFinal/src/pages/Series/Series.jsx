import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import TitleCards from '../../components/TitleCards/TitleCards'
import "./Series.css"

const Series = () => {
  return (
    <div className='series'>
      <Navbar/>
      <main className="list-series">
          <h1>Series:</h1>
          <TitleCards title={"Populares en Netflix"} pageID={2} category={"tv/popular"} />
          <TitleCards title={"Series para maratonear"} category={"tv/top_rated"} />
          <TitleCards title={"Series para niños"} pageID={1} category={"discover/tv?with_genres=10762"} />
          <TitleCards title={"Series de crimen"} pageID={1} category={"discover/tv?with_genres=80"} />
          <TitleCards title={"Documentales"} pageID={1} category={"discover/tv?with_genres=99"} />
      </main>
      <Footer/>        
    </div>
  )
}

export default Series