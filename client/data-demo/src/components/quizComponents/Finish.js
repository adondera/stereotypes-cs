import React, { useState } from "react";
import { Grid, Paper, Typography, Button, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../../styles/Finish";

const Finish = (props) => {
  const classes = useStyles();
  const [email, setemail] = useState(false)

  const onClick = () => {
    props.finishQuiz(email);
  };
  return (
      <div className={classes.root}>
        <Grid container spacing={3} alignItems="center" justify="center">
          {/*title*/}
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <Typography variant="h6">{props.title}</Typography>
            </Paper>
          </Grid>
          {/*additional text*/}
          <Grid item xs={12} sm={9}>
              {props.text}
          </Grid>
          <Grid item xs={12} sm={9} style={{textAlign: 'center'}}>
            <TextField id="outlined-basic" style={{margin: 'auto'}} label="Email (optioneel)" variant="outlined" onChange={(event) => setemail(event.target.value)} />
          </Grid>
          {/*button*/}
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper} elevation={0}>
              <Link to="/results" style={{ textDecoration: "none" }}>
                <Button
                    style={{ margin: "auto" }}
                    variant="contained"
                    color="primary"
                    onClick={onClick}
                >
                  DISCOVER RESULTS
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
  );
};

export default Finish;
