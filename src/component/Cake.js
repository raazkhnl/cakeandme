import React from 'react';

const Cake = (props) => {
  const {cake} = props;

  return (
    <div className="col-sm-6 col-md-4 col-lg-3" key={cake.id}>
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
  );
};

export default Cake;
