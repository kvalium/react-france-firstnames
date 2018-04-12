import React from 'react'
import {Scatter} from 'react-chartjs-2'


const PrenomDetails = (props) => {

  return(
  <div>
    <h1>{props.name}</h1>
    <div className="details">
      <Scatter data={props.results} />
    </div>
  </div>
  );
};

export default PrenomDetails
