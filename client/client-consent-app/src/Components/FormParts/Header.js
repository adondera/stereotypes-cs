import React from "react";
import Typography from "@material-ui/core/Typography";

const Header = () => {
    return (
        <div className="Header">
            <Typography component="div" variant="h4" gutterBottom>
                <img src="/nemo.jpg" alt="image" className="Logo"/>
                <Typography component="div" variant="h4">Informed Consent</Typography>
            </Typography>
        </div>
    );
};

export default Header;
