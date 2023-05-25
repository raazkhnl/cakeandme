import React from 'react'

const Footer = () => {
  return (
    <footer className="container-fluid  bg-light text-center text-lg-start">
  <div className="container pt-2 mb-0">
    <div className="row">
      <div className="col-lg-6 col-md-12  ">
        <div className="d-flex justify-content-center">
          <img src="./favicon/logo.png" alt="Company Logo" className="img-fluid footer-logo" style={{height:"150px"}}/>
        </div>
      </div>
      <div className=" col-lg-6 col-md-12 text-center">
        <div className="social-icons mt-3">
        <a href="https://facebook.com/raazkhnl" className="social-icon mx-3"  rel="noreferrer" target="_blank"><i className="fab fa-facebook" /></a>
          <a href="mailto:cakeandme.bake@gmail.com" className="social-icon mx-3"  rel="noreferrer" target="_blank"><i className="fa fa-at" /></a>
          <a href="https://instagram.com/raazkhnl" className="social-icon mx-3"  rel="noreferrer" target="_blank"><i className="fab fa-instagram" /></a>
          <a href="tel:+9779863244500" className="social-icon mx-3"  rel="noreferrer" target="_blank"><i className="fa fa-phone" /></a>
        </div>
        <p className="mt-3">54 Nørrebrogade, 2200, Copenhagen, Denmark</p>
        
        <p>Contact No: +977-9863244500</p>
      </div>
    </div>
  </div>
  <div className="row text-center "><p>&copy; 2023 <a href="https://instagram.com/raazkhnl" style={{textDecoration:'none', color:"hsl(345, 100%, 2%)", fontSize:'20px'}}>RaaZ Khanal Co.</a> All rights reserved.</p></div>
</footer>

  )
}

export default Footer