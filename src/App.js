import './App.css';
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Navbar from './component/Navbar';
import Aboutus from './component/Aboutus';
import Products from './component/Products';
import Contactus from './component/Contactus';
import Categories from './component/Categories';

const App = () => {
  

  return (
    <div>
      <Router>
        <Navbar/>
				<Routes>
					  <Route exact path="/" element={ <Home /> } />
            <Route exact path="/products" element={ <Products /> } />
					  <Route exact path="/aboutus" element={ <Aboutus /> } />
					  <Route exact path="/contactus" element={ <Contactus /> } />
					  <Route exact path="/categories" element={ <Categories /> } />      
				</Routes>
			</Router>
     
    </div>
  )
}

export default App
