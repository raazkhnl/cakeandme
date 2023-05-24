import React, { useEffect } from 'react'

const Categories = (props) => {

  //Just for loadingbar
  useEffect((props) => {
    const timer = setTimeout(() => {
      props.setProgress(80);
      setTimeout(() => {
        props.setProgress(100);
      }, 10);
    }, 10);
      return () => clearTimeout(timer);
  }, []);

  return (
    <div>Categories</div>
  )
}

export default Categories