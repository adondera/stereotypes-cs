import React from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button"
import Loader from "@material-ui/core/LinearProgress"
const Load = (props) => {
  const [state, setstate] = useState({ isLoading: false });
  return (
    <div style={{width: "50%", paddingTop: 300, margin: "auto"}}>
      {state.isLoading ? (
        <Loader/>
      ) : (
        <Button onClick={() => {setstate({isLoading: true}); props.onClick()}}> LOAD QUESTIONS </Button>
      )}
    </div>
  );
};

export default Load
