import React from 'react';

const Results = (props) => {
  console.log('results_available:' + props.resultsAvailable.toString());

  return (
    <div>
      <h1>RESULTS PAGE HERE</h1>
      <h1> {props.resultsAvailable.toString()} </h1>
    </div>
  );
};

export default Results;
