import React from "react";

const BinaryQuestion = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <img src={props.image1} alt="image1" />
      <img src={props.image2} alt="image2" />
      <button onClick={props.onNext}>LEFT</button>
      <button onClick={props.onNext}>RIGHT</button>
    </div>
  );
};

export default BinaryQuestion;
