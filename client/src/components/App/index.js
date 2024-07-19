import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import MyPage from '../MyPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/Review" element={<Review />} />
                <Route path="/MyPage" element={<MyPage />} />
            </Routes>
        </Router>
    );
};

export default App;
