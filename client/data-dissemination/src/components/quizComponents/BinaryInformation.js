import React, { useState } from "react";
import {
  Button,
  Typography,
  CssBaseline,
  Container,
  GridListTile,
  GridList,
} from "@material-ui/core";
import { useStyles } from "../../styles/BinaryInformation";

const BinaryInformation = (props) => {
  /*eslint-disable */
  const classes = useStyles();

  const [hasNext, sethasNext] = useState(false);
  const [startsIn, setStartIn] = useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      {startsIn ? (
        <div style={{ marginTop: "100px" }}>
          <Typography variant="h1" align="center" color="textPrimary">
            {startsIn}
          </Typography>
        </div>
      ) : (
        <React.Fragment>
          <Container maxWidth={"md"} component="main" className={classes.heroContent}>
          <Typography
            variant="body1"
            align="center"
            color="textPrimary"
            component="p"
          >
            {props.text0}
          </Typography>
            <div style={{ paddingTop: 30 }}>
              <Typography
                variant="body1"
                align="center"
                color="textSecondary"
                component="p"
              >
                {props.text1}
              </Typography>
            </div>
            <GridList
              cellHeight="auto"
              className={classes.gridList}
              cols={props.images0.length}
            >
              {props.images0.map((image) => (
                <GridListTile
                  style={
                    props.images0.length === 4
                      ? { width: "25%", margin: "auto" }
                      : {}
                  }
                  key={image}
                  cols={1}
                >
                  <img
                    style={{ width: "100%", height: "auto" }}
                    src={image}
                    alt={image}
                  />
                </GridListTile>
              ))}
            </GridList>
            <div style={{ paddingTop: 25 }}>
              <Typography
                variant="body1"
                align="center"
                color="textSecondary"
                component="p"
              >
                {props.text2}
              </Typography>
            </div>
            <GridList
              cellHeight="auto"
              className={classes.gridList}
              cols={props.images1.length}
            >
              {props.images1.map((image) => (
                <GridListTile
                  style={
                    props.images0.length === 4
                      ? { width: "25%", margin: "auto" }
                      : {}
                  }
                  key={image}
                  cols={1}
                >
                  <img
                    style={{ width: "100%", height: "auto" }}
                    src={image}
                    alt={image}
                  />
                </GridListTile>
              ))}
            </GridList>
            <div style={{ paddingTop: 25 }}>
              <Typography
                variant="body1"
                align="center"
                color="textPrimary"
                component="p"
              >
                {props.text3}
              </Typography>
            </div>
          </Container>
          <div style={{ margin: "auto", textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ marginTop: 20, marginBottom: 20 }}
              onClick={() => {
                sethasNext(true);
                setTimeout(props.onNext, 4000);
                setStartIn(3);
                setTimeout(() => setStartIn(2), 1000);
                setTimeout(() => setStartIn(1), 2000);
                setTimeout(() => setStartIn("Start!"), 3000);
              }}
              disabled={hasNext}
            >
              NEXT
            </Button>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BinaryInformation;
