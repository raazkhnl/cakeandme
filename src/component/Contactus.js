import React, { useEffect } from 'react'

const Contactus = (props) => {

  //Just for loadingbar
   useEffect(() => {
    const timer = setTimeout(() => {
      props.setProgress(80);
      setTimeout(() => {
        props.setProgress(100);
      }, 10);
    }, 10);
      return () => clearTimeout(timer);
      // eslint-disable-next-line
  }, []);

  return (
    <div className="container text-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="my-2">Contact Us</h3>
            <p>Feel free to reach out to us for any inquiries or to place an order. We'd love to hear from you!</p>
            <h3 className="my-2">Visit Us</h3>
            <p>123 Cake Street, Copenhagen, Denmark</p>
            <h3 className="my-2">Social Media</h3>
            <ul className=" list-inline ">
              <div className="list-inline-item   mx-2">
                <a href="https://www.facebook.com/example" rel="noreferrer" target="_blank"><i className="fab fa-facebook" /></a>
              </div>
              <li className="list-inline-item mx-2">
                <a href="https://www.instagram.com/example" rel="noreferrer" target="_blank"><i className="fab fa-instagram" /></a>
              </li>
              <li className="list-inline-item mx-2">
                <a href="https://www.twitter.com/example" rel="noreferrer" target="_blank"><i className="fab fa-twitter" /></a>
              </li>
            </ul>
            <h3>Email</h3>
            <p>info@example.com</p>
          </div>
        </div>
      </div>


      <div className="row mt-4">
        <div className="col-lg-6 p-3">
          <h3>Find Us on the Map</h3>
          <div className="embed-responsive">
            <iframe width="450" title='Location'
  height="250" className="embed-responsive-item border rounded" style={{border:"10px",borderColor: "#992d99"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.453153274628!2d12.5683374159302!3d55.6760983805466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465253e4b44fe7d7%3A0x6f27e2712a4df9e!2sCopenhagen%2C%20Denmark!5e0!3m2!1sen!2s!4v1623136944686!5m2!1sen!2s" allowFullScreen />
          </div>
        </div>
      


    
      <div className="container col-lg-5  rounded p-3 m-3" style={{backgroundColor: '#992d99'}}>
      <div className="text-center">
        Contact Us
        <hr />
      </div>
        <form action='https://formspree.io/f/xrgvvqne' method='POST'>
          
          <div className="form-group">
            <input type="email" name="email" className="form-control" placeholder="Your Email" />
          </div>
          <div className="form-group mt-3">
            <textarea name='message' className="form-control" rows={5} placeholder="Message" defaultValue={""} />
          </div>
          <input type="hidden" name="_next" value="http://localhost:3000/" />

          <button type="submit" className="btn btn-light bg-light mt-2" >Send Message</button>
        </form>
        </div>
      </div>
      </div>

  
    



  )
}

export default Contactus