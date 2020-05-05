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
    this.signatureDiv = {width: 300, height: 100}
    this.props = props;
    this.state = { 
      isSigned: false,
      hasValidFields: false,
      isSubmittable: false,
      isAgreed: false,
      firstNameChild: "",
      lastNameChild: "",
      firstNameParent: "",
      lastNameParent: ""
  };
  }

  componentDidMount = () => {
    this.signatureRef.off()
    this.signatureRef.getCanvas().width = document.getElementById('sigSize').getBoundingClientRect().width
    this.signatureRef.getCanvas().height = document.getElementById('sigSize').getBoundingClientRect().height
  }

  agreedChanged = (event) => {
    if (this.state.isAgreed) {
      this.signatureRef.clear();
      this.signatureRef.off();
      this.setState({isSubmittable: false, isSigned: false})
    } else {
      this.signatureRef.on()
    }
    this.setState({isAgreed: !this.state.isAgreed });
  };

  componentDidUpdate(prevProps) {

      if(!this.state.isSigned && !this.signatureRef.isEmpty()) {
        this.setState({isSigned: true})
      }
      if(this.state.isSubmittable === false) {
        if(this.state.hasValidFields && this.state.isSigned && this.state.isAgreed) {
          this.setState({isSubmittable: true})
        }
      }
      if (this.state.hasValidFields === true && fields.filter((field) => this.state[field.id].length === 0).length > 0) {
        this.setState({hasValidFields: false, isSubmittable: false})
      }
      if(this.state.hasValidFields === false && fields.filter((field) => this.state[field.id].length === 0).length === 0) {
        this.setState({hasValidFields: true})
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
              onClick={this.agreedChanged}
            />
          </Grid>
          <Grid item xs={12} >
            <div className="Signature" id='sigSize' >
              <Signature
                ref={(ref) => {
                  this.signatureRef = ref;
                }}
                canvasProps={{ width: this.signatureDiv.width, height: this.signatureDiv.height}}
                onEnd = {(() => this.setState({isSigned: true}))}
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
