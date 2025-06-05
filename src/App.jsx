import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} index />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
