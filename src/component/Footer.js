import React from 'react'

const Footer = () => {
  return (
    <footer className="container-fluid  bg-light text-center text-lg-start">
  <div className="container p-2">
    <div className="row">
      <div className="col-lg-6 col-md-12  ">
        <div className="d-flex justify-content-center">
          <img src="/favicon/icon.png" alt="Company Logo" className="img-fluid footer-logo" />
        </div>
      </div>
      <div className=" col-lg-6 col-md-12 text-center">
        <div className="social-icons mt-3">
        <a href="facebook.com" className="social-icon mx-3" target="_blank"><i className="fab fa-facebook" /></a>
          <a href="twitter.com" className="social-icon mx-3" target="_blank"><i className="fab fa-twitter" /></a>
          <a href="instagram.com" className="social-icon mx-3" target="_blank"><i className="fab fa-instagram" /></a>
        </div>
        <p className="mt-3">54 Nørrebrogade, 2200, Copenhagen, Denmark

</p>
        <p>Contact No: 123-456-7890</p>
      </div>
    </div>
  </div>
  <div className="row text-center"><p>&copy; 2023 RaaZ Khanal Co. All rights reserved.</p></div>
</footer>

  )
}

export default Footer