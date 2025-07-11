import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListingPage from './pages/ListingPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
