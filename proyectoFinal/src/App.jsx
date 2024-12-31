import Home from './pages/Home/Home';
import { Routes, Route, Link } from "react-router-dom";
import Browser from "./pages/Browser/Browser"
import Player from './pages/Player/Player';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series';

function App(){
  return (
    <div>
      <Routes>
        <Route path= '/' element={<Home/>}/>
        <Route path= '/browser' element={<Browser/>}/>
        <Route path= '/player/:tipo/:id' element={<Player/>}/>
        <Route path= '/movies' element={<Movies/>}/>
        <Route path= '/series' element={<Series/>}/>
      </Routes>
    </div>
  );
}

export default App