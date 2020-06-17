import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Loader from "@material-ui/core/LinearProgress";
import { InputLabel } from "@material-ui/core";
import { getResults } from "../utils/requests/getResults";
import { getVersions } from "../utils/requests/getQuiz";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Link } from 'react-router-dom';

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

  const [state, setstate] = useState({ isLoading: false, version: 0 });
  const [checkedVersion, setversion] = useState("");
  const [results, setresults] = useState(false);
  const [versions, setversions] = useState(false);
  const ExcelFile = modules.modules.ExcelFile;
  const ExcelSheet = modules.modules.ExcelSheet;

  useEffect(() => {
    if (props.loadFailed) setstate({ isLoading: false });
  }, [props.loadFailed]);

  useEffect(() => {
    if (!versions) {
      fetchVersions();
    }
  }, [versions]);

  const fetchResults = async () => {
    getResults(props.accessToken)
      .then((res) => setresults([res.data]))
      .catch();
  };

  const fetchVersions = async () => {
    getVersions()
      .then((res) => {
        setversions(res.data);
      })
      .catch(setversions({ A: "Version 1" }));
  };

  return (
    <div style={{ width: "50%", paddingTop: 300, margin: "auto" }}>
      {state.isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Grid container spacing={2}>
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
            <Grid item xs={6} style={{ textAlign: "left", margin: "auto" }}>
              <Button
                style={{ margin: "auto" }}
                variant="contained"
                color="primary"
                disabled={checkedVersion === ""}
                onClick={() => {
                  setstate({ isLoading: true });
                  props.onLoadData(checkedVersion);
                }}
              >
                {" "}
                Start Session{" "}
              </Button>
            </Grid>
            <Grid item xs={12} style={{marginTop: 20}}>
              <Link to="/participants" style={{textDecoration: 'none'}}>
                <Button color='primary' variant="contained">Participants</Button>
              </Link>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      <InputLabel
        error
        style={{
          visibility: props.loadFailed ? "visible" : "hidden",
          marginTop: 20,
        }}
      >
        Data load failed
      </InputLabel>
      <br />
      {results ? (
        <ExcelFile
          element={
            <Button
              variant="contained"
              color="primary"
            >
              Data Ready!
            </Button>
          }
        >
          <ExcelSheet dataSet={results} name="Organization" />
        </ExcelFile>
      ) : (
        <Button
          onClick={fetchResults}
          variant="contained"
          color="primary"
        >
          Start Download Data
        </Button>
      )}
    </div>
  );
};

export default Load;
