import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './layout/Layout';
import FavoritesLayout from './layout/FavoritesLayout';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} index />
        </Route>
        <Route element={<FavoritesLayout />}>
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
