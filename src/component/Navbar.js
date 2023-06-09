import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation()
  return (
   <nav className="navbar navbar-expand-lg  bg-light sticky-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/cakeandme"><img  style={{width: "40px"}} src="./favicon/logo.png" alt="icon" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2">
          <Link className={`nav-link ${location.pathname==="/cakeandme" ? "active" : ""}`}  aria-current="page" to="/cakeandme">Home</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className={`nav-link ${location.pathname==="/cakeandme/cakes" ? "active" : ""}`}  to="/cakeandme/cakes">Cakes</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className={`nav-link ${location.pathname==="/cakeandme/ordernow" ? "active" : ""}`}  to="/cakeandme/ordernow">Order Now</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className={`nav-link ${location.pathname==="/cakeandme/aboutus" ? "active" : ""}`}  to="/cakeandme/aboutus">About Us</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className={`nav-link ${location.pathname==="/cakeandme/contactus" ? "active" : ""}`}  to="/cakeandme/contactus">Contact Us</Link>
        </li>

        <li className="nav-item dropdown">
          <Link className="nav-link  mx-2 dropdown-toggle " to="/cakeandme/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          <ul className="dropdown-menu">
            <li><Link className={`nav-link ${location.pathname==="/cakeandme" ? "active" : ""}`}  to="/cakeandme">Birthday</Link></li>
            <li><Link className={`nav-link ${location.pathname==="/cakeandme" ? "active" : ""}`}  to="/cakeandme">Anniversary</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className={`nav-link ${location.pathname==="/cakeandme" ? "active" : ""}`}  to="/cakeandme/ordernow">Custom Specialized</Link></li>
          </ul>
        </li>
      </ul>
      <form action='/cakeandme/cakes' className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn " style={{backgroundColor:"#992d99"}}  type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

  )
}

export default Navbar



