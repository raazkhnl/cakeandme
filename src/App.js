import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
					  {/* <Route exact path="/" element={ <Home setProgress={setProgress}/> } />
            <Route exact path="/cakes" element={ <Cakes setProgress={setProgress}/> } />
            <Route exact path="/ordernow" element={ <Order setProgress={setProgress}/> } />
					  <Route exact path="/aboutus" element={ <Aboutus setProgress={setProgress}/> } />
					  <Route exact path="/contactus" element={ <Contactus setProgress={setProgress}/> } />
          <Routes exact path="/categories" element={ <Categories setProgress={setProgress}/> } /> */}
          <Route exact path="/cakeandme" element={ <RedirectToHomePage /> } />
          <Route exact path="/cakeandme/home" element={ <Home setProgress={setProgress}/> } />
            <Route exact path="/cakeandme/cakes" element={ <Cakes setProgress={setProgress}/> } />
            <Route exact path="/cakeandme/ordernow" element={ <Order setProgress={setProgress}/> } />
					  <Route exact path="/cakeandme/aboutus" element={ <Aboutus setProgress={setProgress}/> } />
					  <Route exact path="/cakeandme/contactus" element={ <Contactus setProgress={setProgress}/> } />
					  <Route exact path="/cakeandme/categories" element={ <Categories setProgress={setProgress}/> } />      
				</Routes>
        <Footer/>
			</Router>
     
    </div>
  )



 

}

function RedirectToHomePage() {
  const location = useLocation();

  // Check if the current route is '/page'
  if (location.pathname === '/cakeandme' || location.pathname === '/cakeandme/') {
    return <Navigate to="/cakeandme/home" replace />;
  }

  // Render null if not on '/page'
  return null;
}

export default App
