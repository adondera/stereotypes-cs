import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Signature from "react-signature-canvas";
import Button from "@material-ui/core/Button";
import fields from "./ConsentFields";
import "./style/Form.css";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { 
      isSigned: false,
      firstNameChild: "",
      lastNameChild: "",
      firstNameParent: "",
      lastNameParent: "",
      isSubmittable: false
  };
  }

  signedChanged = (event) => {
    if (this.state.isSigned) {
      this.signatureRef.clear();
      this.setState({isSubmittable: false})
    }
    this.setState({ isSigned: !this.state.isSigned });
  };

  componentDidUpdate(prevProps) {

    if(this.state.isSubmittable) {
      if (fields.filter((field) => this.state[field.id].length === 0).length > 0) {
        this.setState({isSubmittable: false})
      }
    } 
    else {
      if(this.state.isSigned && fields.filter((field) => this.state[field.id].length === 0).length === 0) {
        this.setState({isSubmittable: this.state.isSigned})
      }
    }
  }

  render() {
    return (
      <div className="Footer">
        <Grid container spacing={3}>
          {fields.map((field, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  fullWidth
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  value={this.state[field.id]}
                  autoComplete={field.autoComplete}
                  onChange={field.onChange.bind(this)}
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="agree" value="yes" />
              }
              label="Agree to share data and sign"
              onClick={this.signedChanged}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="Signature">
              <Signature
                ref={(ref) => {
                  this.signatureRef = ref;
                }}
                canvasProps={{ width: 500, height: 100 }}
              ></Signature>
            </div>
          </Grid>
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
