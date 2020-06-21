import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { InputLabel } from "@material-ui/core";
import { getResults } from "../utils/requests/getResults";
import { getVersions } from "../utils/requests/getQuiz";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

var modules = require("react-export-excel");

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Load = (props) => {
  const classes = useStyles();

  const [state, setstate] = useState({ isLoading: false, version: props.version });
  const [checkedVersion, setversion] = useState(props.version);
  const [results, setresults] = useState(false);
  const [versions, setversions] = useState(false);
  const ExcelFile = modules.modules.ExcelFile;
  const ExcelSheet = modules.modules.ExcelSheet;

  useEffect(() => {
    if (props.loadFailed) setstate({ isLoading: false });
  }, [props.loadFailed]);

  useEffect(() => {
    if (props.isDataLoaded) {
      setstate({ isLoading: false });
    }
  }, [props.isDataLoaded]);

  useEffect(() => {
    if (!versions) {
      fetchVersions();
    }
  }, [versions]);

  // Fetch the results
  const fetchResults = async () => {
    getResults(props.accessToken)
      .then((res) => setresults([res.data]))
      .catch();
  };

  // Get the versions of the quiz.
  // If any error occurs, always select the first version.
  const fetchVersions = async () => {
    getVersions()
      .then((res) => {
        setversions(res.data);
      })
      .catch(setversions({ A: "Version 1" }));
  };

  // Function to determine the version of the quiz to be loaded.
  // If the value string is 'R' the quiz is randomly selected.
  const getCurrentVersion = (version) => {
    var ver = version;
    if (version === "R"){
      ver = Object.keys(versions)[Math.floor(Math.random() * Object.keys(versions).length)];
    }
    return ver;
  };

  return (
    <div style={{ width: "50%", paddingTop: 200, margin: "auto" }}>
      <Grid container spacing={2}>
        {/* VERSION DROPDOWN */}
        <Grid item xs={6} style={{ textAlign: "right" }}>
          {versions ? (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Version
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={checkedVersion}
                onChange={(event) => setversion(event.target.value)}
                label="Version"
              >
                {/* The first MenuItem will always be the RANDOM one */}
                <MenuItem key="R" value="R">
                  random
                </MenuItem>
                {/* All other selections */}
                {Object.keys(versions).map((versionKey, index) => {
                  return (
                    <MenuItem key={versionKey} value={versionKey}>
                      {versions[versionKey]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : null}
        </Grid>
        {/* LOAD QUESTIONS BUTTON */}
        <Grid item xs={6} style={{ textAlign: "left", margin: "auto" }}>
          <Button
            style={{ margin: "auto" }}
            variant="contained"
            color="primary"
            disabled={checkedVersion === "" || state.isLoading}
            onClick={() => {
              setstate({ isLoading: true });
              props.onLoadData(getCurrentVersion(checkedVersion));
            }}
          >
            {" "}
            LOAD QUESTIONS{" "}
          </Button>
        </Grid>
      </Grid>
      {/* ERROR MESSAGE */}
      <InputLabel
        error
        style={{
          visibility: props.loadFailed ? "visible" : "hidden",
          marginTop: 20,
        }}
      >
        Data load failed
      </InputLabel>
      {/* PARTICIPANTS BUTTON */}
      <Grid item xs={12} style={{ marginTop: 20 }}>
        <Link to="/participants" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Participants
          </Button>
        </Link>
      </Grid>
      <Grid item={12} style={{ marginTop: 20 }}>
        <Link to={"/stats"} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Live stats
          </Button>
        </Link>
      </Grid>
      {/* DOWNLOAD DATA */}
      {results ? (
        <ExcelFile
          element={
            <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
              Data Ready!
            </Button>
          }
        >
          <ExcelSheet dataSet={results} name="Organization" />
        </ExcelFile>
      ) : (
        <Button onClick={fetchResults} variant="contained" color="primary" style={{ marginTop: 20 }}>
          Download Data
        </Button>
      )}
      <br />
      {/* START BUTTON */}
      <Link
        to={props.isDataLoaded ? "/app" : "/load"}
        style={{ textDecoration: "none" }}
      >
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: 50 }}
          disabled={!props.isDataLoaded}
        >
          Start session
        </Button>
      </Link>
    </div>
  );
};

export default Load;
