import { Routes, Route } from "react-router-dom"
import Home from "./Home"
import MovieInfo from "./MovieInfo"
import Similar from "./Similar"
import Watch from "./Watch"
import Person from "./Person"
import Download from "./Download"
import Series from "./series"
const App = () => {
 return (
  <>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/title/:id/:id" element={<MovieInfo />} />
    <Route path="/similar/:id/:id" element={<Similar />} />
    <Route path="/tv/:id/:id" element={<MovieInfo />} />
    <Route path="/watch/movie/:id/:id/:id" element={<Watch />} />
    <Route path="/tv/series/:id/:id/:id" element={<Series />} />
    <Route path="/person/:id" element={<Person />} />
    <Route path="/download/movie/:id" element={<Download />} />
   </Routes>
  </>
 )
}
export default App
