import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Signature from 'react-signature-canvas'
import Button from '@material-ui/core/Button'
import './style/Form.css'

class Footer extends Component {

  constructor(props) {
    super(props)
    this.props = props
    this.state = {signed: false}
  }

   firstNameChange = (event) => {
     this.setState({firstName: event.target.value})
   }

   lastNameChange = (event) => {
     this.setState({lastName: event.target.value})
   }

   firstNameChildChange = (event) => {
     this.setState({firstNameChild: event.target.value})
   }

   secondNameChildChange = (event) => {
     this.setState({lastNameChild: event.target.value})
   }

   signedChanged = (event) => {
     if(this.state.signed) {
       this.signatureRef.clear()
     }
     this.setState({signed: !this.state.signed})
   }
  
  render() {
    return (
    <div className='Footer'>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstNameChind"
            name="firstNameChild"
            label="Child's first name"
            fullWidth
            autoComplete="fname"
            onChange={this.firstNameChildChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastNameChild"
            name="lastNameChild"
            label="Last name"
            fullWidth
            onChange={this.secondNameChildChange}
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstNameParent"
            name="firstNameParent"
            label="Parent's first name"
            fullWidth
            onChange={this.firstNameChange}
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastNameParent"
            name="lastNameParent"
            label="Last name"
            fullWidth
            onChange={this.lastNameChange}
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Agree to share data"
            onClick={this.signedChanged}
          />
        </Grid>
        <Grid item xs={12}>
            <div className='Signature'>
                <Signature ref={(ref) => {this.signatureRef = ref}} canvasProps={{width: 500, height: 100}}></Signature>
            </div>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" disableElevation onClick={this.props.onSubmit(this.state)}>
          Submit
      </Button>
    </div>
  );
  };
}

export default Footer;