import React, { useEffect, useState } from 'react';

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
  return (
    <div className="row container-fluid mt-4 text-center">
  <h2>Featured Cakes</h2>
  <h6>{cakes.length === 0 && "No notes to display."}</h6>
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
                      </div>
                    </div>
                  </div>
                })}
                </div>



    
  );
};

export default Cakes;
