import React from "react";
import {Typography, Grid} from "@material-ui/core";


const Header = () => {
    return (
        <div className="Header">
            <Grid item xs={12} sm={6} style={{margin: 'auto'}}>
                <img src="/nemo.jpg" alt="nemo_logo" className="Logo"/>
            </Grid>
            <Grid item xs={12} sm={6} style={{margin: 'auto'}}>
                <Typography variant="h5" style={{fontWeight: "bold"}}>TOESTEMMINGSFORMULIER MINDERJARIGEN</Typography>
            </Grid>
        </div>
    );
};

export default Header;
