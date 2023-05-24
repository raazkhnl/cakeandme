import React, { useEffect } from 'react'

const Order = (props) => {

    //Just for loadingbar
    useEffect(() => {
        const timer =  setTimeout(() => {
          props.setProgress(80);
          setTimeout(() => {
            props.setProgress(100);
          }, 10);
        }, 10);
          return () => clearTimeout(timer);
          // eslint-disable-next-line
      }, []);
  

  return (
    <section className="row m-5">

    <div className="container col-md-6 rounded p-5" style={{backgroundColor: '#992d99'}}>
      <div className="h1  text-center">
        Orded Now
        <hr />
      </div>
      <form action='https://formspree.io/f/moqzzwvr' method='POST'>
        <div className="form-group">
          <label htmlFor="username">Cake Name:</label>
          <input className="form-control" name="cakename" type="cakename" placeholder="Enter Cake Name" required/>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="email">Email:</label>
          <input className="form-control"  name="email" type="email" placeholder="email@gmail.com" required/>
        </div>   
        <div className="form-group mt-3">
          <label htmlFor="date">Required By:</label>
      <input name='date' type="datetime-local" id="localdatetime" className="form-control rounded-localdatetime" required></input>
        </div>
        <div className="form-group rounded-dropdown mt-3">
          <label htmlFor="Field">Select Size:</label><br />
          <select name='size' className="px-4 mt-2 rounded">
            <option>1 Pound</option>
            <option>1.5 Pound</option>
            <option>2 Pound</option>
            <option>2.5 Pound</option>
            <option>3 Pound</option>
            <option>5 Pound</option>
          </select>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="pwd">Description:</label>
          <textarea name="description" className="form-control rounded" placeholder="Any Description" rows={5} defaultValue={""} />
        </div>
        <center>
        <button type="submit" className="btn btn-light bg-light mt-2" >Send Message</button>
         
        </center>
      </form>
  
  </div>
</section>

  )
}

export default Order