import React, { useEffect, useState } from 'react'
import Cake from './Cakes';
import Cakes from './Cakes';

const Home = (props) => {
  return (
    <div>
  <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={3} aria-label="Slide 4" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={4} aria-label="Slide 5" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={5} aria-label="Slide 6" />
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={6} aria-label="Slide 7" />


    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="/cake/banner1.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-sm-block">
          <h3>Delight in Every Bite</h3>
        </div>
      </div>
      <div className="carousel-item">
        <img src="/cake/banner2.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-sm-block">
          <h3>Cakes for Unforgettable Moments</h3>
        </div>
      </div>
      <div className="carousel-item">
        <img src="/cake/banner3.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-sm-block">
          <h3>Cakes that Make Memories Last</h3>
        </div>
      </div>
      <div className="carousel-item">
        <img src="/cake/banner4.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-sm-block">
          <h3>Sweet Masterpieces for Every Palate</h3>
        </div>
      </div>
      <div className="carousel-item">
        <img src="/cake/banner5.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-sm-block">
          <h3>"From Our Oven to Your Celebration</h3>
        </div>
      </div>
      <div className="carousel-item">
        <img src="/cake/banner6.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-sm-block">
          <h3>The Sweetest Destination in Town</h3>
        </div>
      </div><div className="carousel-item">
        <img src="/cake/banner3.jpg" className="d-block w-100" alt="..." />
        <div className="carousel-caption d-none d-sm-block">
          <h3>Cake Bliss for Every Occasion</h3>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="visually-hidden">Next</span>
    </button>
  </div>

    <Cakes setProgress={props.setProgress}/>
  
</div>

  )
}

export default Home