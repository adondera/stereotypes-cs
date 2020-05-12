import React from "react";

const Finish = (props) => {
  return (
    <div>
      <button onClick={props.onFinish}>END</button>
    </div>
  );
};

export default Finish;
