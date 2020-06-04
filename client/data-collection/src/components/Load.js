import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Loader from "@material-ui/core/LinearProgress";
import { InputLabel } from "@material-ui/core";

var modules = require('react-export-excel')

const multiDataSet = [
  {
      columns: ["Name", "Salary", "Sex"],
      data: [
          ["Johnson", 30000, "Male"],
          ["Monika", 355000, "Female"],
          ["Konstantina", 20000, "Female"],
          ["John", 250000, "Male"],
          ["Josef", 450500, "Male"],
      ]
  },
  {
      xSteps: 1, // Will start putting cell with 1 empty cell on left most
      ySteps: 5, //will put space of 5 rows,
      columns: ["Name", "Department"],
      data: [
          ["Johnson", "Finance"],
          ["Monika", "IT"],
          ["Konstantina", "IT Billing"],
          ["John", "HR"],
          ["Josef", "Testing"],
      ]
  }
];

const Load = (props) => {
  const [state, setstate] = useState({ isLoading: false });
  const ExcelFile = modules.modules.ExcelFile
  const ExcelSheet =  modules.modules.ExcelSheet

  useEffect(() => {
    if(props.loadFailed) setstate({isLoading: false})
  }, [props.loadFailed])

  return (
    <div style={{ width: "50%", paddingTop: 300, margin: "auto" }}>
      {state.isLoading ? (
        <Loader />
      ) : (
        <Button
        variant='contained'
        color='primary'
          onClick={() => {
            setstate({ isLoading: true });
            props.onClick();
          }}
        >
          {" "}
          LOAD QUESTIONS{" "}
        </Button>
      )}
      <InputLabel error style={{visibility: props.loadFailed ? 'visible' : 'hidden', marginTop: 20}}>
        Data load failed
      </InputLabel>
      <br/>
      <ExcelFile element={<Button style={{marginTop: 20}} variant='contained' color='primary'>Download Data</Button>}>
        <ExcelSheet dataSet={multiDataSet} name="Organization" />
      </ExcelFile>
    </div>
  );
};

export default Load;
