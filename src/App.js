import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import LoanPage from './pages/LoanPage/LoanPage';
import FAQ from './pages/FAQ/FAQ';
import CheckoutPage from './components/Checkout/CheckoutPage';
import EarningsCalculator from './pages/Pagos/Pagos';

function App() {
  return (    
      <div className="App">
        <BrowserRouter>
        <Header />        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Blog" element={<BlogPage />} />
            <Route path="/Loans" element={<LoanPage />} />
            <Route path="/Checkout" element={<CheckoutPage />} />
            <Route path="/Faq" element={<FAQ />} />
            <Route path="/Pagos" element={<EarningsCalculator />} />
          </Routes>        
        <Footer />
        </BrowserRouter>
      </div>    
  );
}

export default App;