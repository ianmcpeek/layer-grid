import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Conway from './applications/Conway/Conway';
import GeographyMap from './applications/GeographyMap/GeographyMap';
import GridRandomizer from './applications/GridRandomizer/GridRandomizer';
import Percolator from './applications/Percolator/Percolator';
import Rotate from './applications/Rotate/Rotate';
import Splash from './applications/Site/Splash';
import ScrollerSpread from './applications/Site/Examples/Scroller/ScrollerSpread';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/*" index element={<Splash />} />
          <Route path="/random" element={<GridRandomizer />} />
          <Route path="/conway" element={<Conway />} />
          <Route path="/flow" element={<Percolator />} />
          <Route path="/map" element={<GeographyMap />} />
          <Route path="/rotate" element={<Rotate />} />
          <Route path="/scroll" element={<ScrollerSpread />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
