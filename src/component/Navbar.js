import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  let location = useLocation()
  return (
   <nav className="navbar navbar-expand-md bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img  style={{width: "50px"}} src="/favicon/icon.png" alt="icon" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`}  aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/cakes" ? "active" : ""}`}  to="/cakes">Cakes</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/aboutus" ? "active" : ""}`}  to="/aboutus">About Us</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/contactus" ? "active" : ""}`}  to="/contactus">Contact Us</Link>
        </li>

        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle " to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          <ul className="dropdown-menu">
            <li><Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`}  to="/"></Link></li>
            <li><Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`}  to="/">Another action</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`}  to="/">Something else here</Link></li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

  )
}

export default Navbar



