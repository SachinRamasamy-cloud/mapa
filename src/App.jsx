import './App.css'
import { Routes, Route } from "react-router-dom";
import Hero from './pages/dashboard/hero';
import Topanime from './pages/dashboard/topanime';
import Recommendan from './pages/dashboard/recommendan';
import Head from './components/Head';
import Banner from './banner/Banner1';
import Newanime from './pages/dashboard/Newanime';
import UpcommingAn from './pages/dashboard/UpcommingAn';
import Detail from './pages/detail/Detail';
import Banner2 from './banner/Banner2';
import TopAir from './pages/dashboard/TopAir';
import Recommendmanga from './pages/dashboard/recommendmanga';
import Topmanga from './pages/dashboard/Topmanga';
import Generes from './pages/genere/Generes';
import GenresAll from './pages/dashboard/Geners';
import Allgeneres from './pages/Allgener/Allgeneres';
import AnimeSearch from './pages/search/Search';
import Footer from './components/Footer';
import Pnf from './Pnf';

function App() {
  return (
    <>
      <Head />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Topanime />
              <Recommendan />
              <Banner />
              <UpcommingAn />
              <Newanime />
              <TopAir />
              <Banner2 />
              <Topmanga />
              <Recommendmanga />
              <GenresAll />
            </>
          }
        />
        <Route path="/anime/:id" element={<Detail />} />
        <Route path="/genres/:id/:name" element={<Generes />} />
        <Route path="/genres" element={<Allgeneres />} />
        <Route path="/search" element={<AnimeSearch />} />
        <Route path="*" element={<Pnf />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
