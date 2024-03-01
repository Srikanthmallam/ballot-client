import React from 'react'
import Loading from '../assets/loading2.gif'

const Loader = () => {
  return (
    <div className="w-full  h-full bg-tranperent grid place-content-center mb-28">
      <img src={Loading} alt="loading" className="w-10 h-10" />
    </div>
  );
}

export default Loader
