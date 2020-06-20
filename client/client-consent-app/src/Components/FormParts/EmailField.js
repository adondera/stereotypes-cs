import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const Email = React.forwardRef((props, ref) => {
  return (
    <React.Fragment>
      <Grid item xs={12} md={6}>
        <TextField
          inputRef={ref}
          fullWidth
          name={props.email}
          label="Email (optioneel)"
          autoComplete="fname"
        />
      </Grid>
    </React.Fragment>
  );
});

export default Email;
