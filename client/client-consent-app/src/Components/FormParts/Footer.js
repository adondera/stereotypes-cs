import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Signature from "react-signature-canvas";
import Button from "@material-ui/core/Button";
import fields from "./ConsentFields";
import "./style/Form.css";

const ValidateConsentInput = function (input) {
  var letters = /^[A-Za-z\-\s]+$/;
  if (input.length === 0 || input.match(letters)) return true;
  return false;
};

class Footer extends Component {
  constructor(props) {
    super(props);
    this.signatureDiv = { width: 300, height: 100 };
    this.props = props;
    this.state = {
      isSigned: false,
      hasValidFields: false,
      isSubmittable: false,
      isAgreed: false,
      firstNameChild1: "",
      lastNameChild1: "",
      firstNameParent: "",
      lastNameParent: "",
      numberOfChildren: 1
    };
  }

  componentDidMount = () => {
    this.signatureRef.off();
    this.signatureRef.getCanvas().width = document
      .getElementById("sigSize")
      .getBoundingClientRect().width;
    this.signatureRef.getCanvas().height = document
      .getElementById("sigSize")
      .getBoundingClientRect().height;
  };

  onAddClick = () => {
    var fst = "firstNameChild" + (this.state.numberOfChildren + 1)
    var snd = "lastNameChild" + (this.state.numberOfChildren + 1)
    var newChild = {
      firstName: {
        id: fst,
        name: fst,
        label: "Child's first name",
        onChange: function (event) {
          var newObj = {}
          newObj[fst] = event.target.value
          if (!ValidateConsentInput(event.target.value)) return;
          this.setState(newObj);
        },
        autoComplete: "fnameChild",
      },
      lastName: {
        id: snd,
        name: snd,
        label: "Child's second name",
        onChange: function (event) {
          if (!ValidateConsentInput(event.target.value)) return;
          var newObj = {}
          newObj[snd] = event.target.value; 
          this.setState(newObj);
        },
        autoComplete: "lnameChild",
      },
    }
    if (this.state.numberOfChildren < 3) {
      fields.push(newChild)
      var newObj = {}
      newObj[fst] = ""
      newObj[snd] = ""
      newObj["numberOfChildren"] = this.state.numberOfChildren + 1
      this.setState(newObj)
    }
  }

  agreedChanged = (event) => {
    if (this.state.isAgreed) {
      this.signatureRef.clear();
      this.signatureRef.off();
      this.setState({ isSubmittable: false, isSigned: false });
    } else {
      this.signatureRef.on();
    }
    this.setState({ isAgreed: !this.state.isAgreed });
  };

  componentDidUpdate(prevProps) {
    if (!this.state.isSigned && !this.signatureRef.isEmpty()) {
      this.setState({ isSigned: true });
    }
    if (this.state.isSubmittable === false) {
      if (
        this.state.hasValidFields &&
        this.state.isSigned &&
        this.state.isAgreed
      ) {
        this.setState({ isSubmittable: true });
      }
    }
    console.log(this.state.hasValidFields);
    if (
      this.state.hasValidFields === true &&
      fields.filter((field) => this.state[field.firstName.id].length === 0)
        .length > 0 &&
      fields.filter((field) => this.state[field.lastName.id].length === 0)
        .length > 0
    ) {
      this.setState({ hasValidFields: false, isSubmittable: false });
    }
    if (
      this.state.hasValidFields === false &&
      fields.filter((field) => this.state[field.firstName.id].length === 0)
        .length === 0 &&
      fields.filter((field) => this.state[field.lastName.id].length === 0)
        .length === 0
    ) {
      this.setState({ hasValidFields: true });
    }
  }

  render() {
    return (
      <div className="Footer">
        <Grid container spacing={3}>
          {fields.map((field, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={field.firstName.id}
                    name={field.firstName.name}
                    label={field.firstName.label}
                    value={this.state[field.firstName.id]}
                    autoComplete={field.firstName.autoComplete}
                    onChange={field.firstName.onChange.bind(this)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id={field.lastName.id}
                    name={field.lastName.name}
                    label={field.lastName.label}
                    value={this.state[field.lastName.id]}
                    autoComplete={field.lastName.autoComplete}
                    onChange={field.lastName.onChange.bind(this)}
                  />
                </Grid>
              </React.Fragment>
            );
          })}</Grid>
          <Button 
            className="PlusButton"
            size="small"
            variant="contained"
            color="primary"
            disableElevation
            onClick={this.onAddClick}
          >
            +
          </Button>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="agree" value="yes" />}
              label="Agree to share data and sign"
              onClick={this.agreedChanged}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="Signature" id="sigSize">
              <Signature
                ref={(ref) => {
                  this.signatureRef = ref;
                }}
                canvasProps={{
                  width: this.signatureDiv.width,
                  height: this.signatureDiv.height,
                }}
                onEnd={() => this.setState({ isSigned: true })}
              ></Signature>
            </div>
          </Grid>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          disabled={!this.state.isSubmittable}
          onClick={this.props.onSubmit(this.state)}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default Footer;
