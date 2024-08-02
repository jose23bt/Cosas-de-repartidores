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
import Directorio from './pages/Directorio/Directorio';
import Leyes from './pages/Leyes/Leyes';
import DeliveryCalculator from './pages/Pagos/PagosManual';
import Fake from './pages/Fake/Fake';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/loans" element={<LoanPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/Pagos" element={<EarningsCalculator />} />
            <Route path="/SimuladorManual" element={<DeliveryCalculator />} />
            <Route path="/Directorio" element={<Directorio />} />
            <Route path="/Leyes" element={<Leyes />} />
            <Route path="/Fake" element={<Fake />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
