import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Navbar from './component/Navbar';
import Aboutus from './component/Aboutus';
import Contactus from './component/Contactus';
import Categories from './component/Categories';
import LoadingBar from 'react-top-loading-bar';
import Footer from './component/Footer';
import Cakes from './component/Cakes';
import Order from './component/Order';

const App = () => {
  const [progress, setProgress] = useState(0);

    return (
    <div>
      <Router>
        <Navbar/>
        <LoadingBar color="#f11946" progress={progress} />
				<Routes>
					  <Route exact path="/" element={ <Home setProgress={setProgress}/> } />
            <Route exact path="/cakes" element={ <Cakes setProgress={setProgress}/> } />
            <Route exact path="/ordernow" element={ <Order setProgress={setProgress}/> } />
					  <Route exact path="/aboutus" element={ <Aboutus setProgress={setProgress}/> } />
					  <Route exact path="/contactus" element={ <Contactus setProgress={setProgress}/> } />
					  <Route exact path="/categories" element={ <Categories setProgress={setProgress}/> } />      
				</Routes>
        <Footer/>
			</Router>
     
    </div>
  )
}

export default App
