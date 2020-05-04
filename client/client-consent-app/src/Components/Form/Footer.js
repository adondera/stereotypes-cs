import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Signature from 'react-signature-canvas'
import './style/Form.css'

const Footer = () => {
  return (

    <div className='Footer'>
      <Typography variant="h6" gutterBottom>
        Informed Consent
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstNameChind"
            name="firstNameChild"
            label="Child name"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastNameChild"
            name="lastNameChild"
            label="Last name"
            fullWidth
            autoComplete="lname"
          />
        </Grid>


        

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        <Grid item xs={12}>
            <div className='Signature'>
                <Signature canvasProps={{width: 300, height: 100}}></Signature>
            </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;