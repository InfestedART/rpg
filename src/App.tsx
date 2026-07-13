import './App.css'
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

import TitleScreen from './pages/TitleScreen/TitleScreen'
import NewChar from './pages/NewChar/NewChar'
import LoadChar from './pages/LoadChar';
import Game from './pages/Game';
import Chess from './pages/Chess';
import NotFound from './pages/NotFound';
import Dungeon from './pages/Dungeon';
import StoreRequired from './components/Layout/StoreRequired';

function App() {
  return (
    <Routes>
      <Route path='/' element={<TitleScreen />} />
      <Route element={<Layout />}>
        <Route path='/newChar' element={<NewChar />} />
        <Route path='/loadChar' element={<LoadChar />} />
        <Route path='/chess' element={<Chess />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<StoreRequired />}>
          <Route path='/game' element={<Game />} />
          <Route path='/dungeon' element={<Dungeon />} />
        </Route>
      </Route>
    </Routes>    
  )
}

export default App
