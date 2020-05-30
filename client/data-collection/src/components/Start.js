import Button from "@material-ui/core/Button";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Images from '../utils/preloaders/images'
const Start = (props) => {
  console.log(Images)
  return (
    <div style={{ width: "80%", margin: "auto", paddingTop: 30 }}>
      <Typography variant="h1">{/* Stereotypes in CS */}</Typography>
      <Typography style={{ marginTop: 30, textAlign: "justify" }} variant="h6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt
        arcu non sodales neque sodales. Ut diam quam nulla porttitor massa id.
        Ornare arcu odio ut sem nulla pharetra diam. Eu volutpat odio facilisis
        mauris sit amet massa vitae. Mi ipsum faucibus vitae aliquet nec
        ullamcorper. Nunc mi ipsum faucibus vitae. Ut faucibus pulvinar
        elementum integer enim neque volutpat ac
      </Typography>
      <Button
        style={{ marginTop: 50 }}
        variant="contained"
        onClick={props.onClick}
        color="primary"
        disabled={!props.canStart}
      >
        START!
      </Button>
    </div>
  );
};

export default Start;
