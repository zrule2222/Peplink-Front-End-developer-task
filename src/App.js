import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShoppingListPage from './pages/ShoppingListPage';
import EditItemPage from './pages/EditItemPage';
import JokesPage from './pages/JokesPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShoppingListPage />} />
        <Route path="/edit/:index" element={<EditItemPage />} />
        <Route path="/jokes" element={<JokesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
