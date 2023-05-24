import React, { useEffect, useRef, useState } from 'react';

const Cakes = (props) => {

//Cake Fetching
const [cakes, setCakes] = useState([]);
useEffect(() => {
  const fetchCakes = async () => {
    try {
      props.setProgress(20);
      const response = await fetch('/cakes.json'); // Adjust the path based on .json location
      props.setProgress(40);
      const data = await response.json();
      props.setProgress(60);
      setCakes(data.cakes);
    } catch (error) {
      console.error('Error fetching cakes:', error);
    }
    props.setProgress(100);
  };
  fetchCakes();
  // eslint-disable-next-line
}, []);

//Buy Cake
const ref = useRef(null)
const refClose = useRef(null)

const [cake, setCake] = useState({id: '', name: '', description:''})
const buyCake = (currentCake) => {
  ref.current.click();
  setCake({ id: currentCake.id, name: currentCake.name, description: currentCake.description})
}
const onChange = (e) => {
  setCake({ ...cake, [e.target.name]: e.target.value })
}

  return (
    <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                
               
                            
                            
                        

                   
                    <div className="container col-md-6 rounded py-2 px-5" style={{backgroundColor: '#992d99'}}>
                      <button ref={refClose} type="button" className="btn-close position-absolute" data-bs-dismiss="modal" aria-label="Close"></button>
      <div className="h1  text-center">
        Orded Now
        <hr />
      </div>
      <form action='https://formspree.io/f/moqzzwvr' method='POST'>
        <div className="form-group">
          <label htmlFor="username">Cake Name:</label>
          <input className="form-control" name="name" value={cake.name} onChange={onChange} type="text" placeholder="Enter Cake Name" required/>
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
          <textarea name="description" value={cake.description} onChange={onChange} className="form-control rounded" placeholder="Any Description" rows={5} />
        </div>
        <center><button disabled={cake.name.length < 3}  type="submit" className="btn btn-light center bg-light mt-2" >Update Note</button></center>
      </form>
  
  


                </div>
            </div>
    <div className="row container-fluid mt-4 text-center">
  <h2>Featured Cakes</h2>
  <h6>{cakes.length === 0 && "No cakes to display."}</h6>
                {cakes.map((cake) => {
                    return <div className="col-sm-6 col-md-4 col-lg-3" key={cake.id}>
                    <div className="card mb-5">
                      <div className='zoom '>
                      <img src={cake.imageUrl} className="rounded-bottom card-img-top zoom" style={{height: "250px"}} alt={cake.name} />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{cake.name}</h3>
                        <p className="card-text">{cake.description}</p>
                        <p className="card-text">Price: ${cake.price}</p>
                        <div className="container mt-4">
                          <button className="btn order-button" style={{backgroundColor:"#992d99"}} onClick={()=>{buyCake(cake)}}>
                            Order Now
                            <i className="fas fa-cart-arrow-down ml-2"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                })}
                </div>

                </>

    
  );
};

export default Cakes;
