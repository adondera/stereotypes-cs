import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const Email = (props) => {
    const onChangeEmail = (event) => {
        var email = props.component.state.email;
            email = event.target.value;
        props.component.setState({ email: email });
    };
    return (
        <React.Fragment>
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    name={props.email}
                    label="email (optioneel)"
                    value={props.email}
                    autoComplete="fname"
                    onChange={onChangeEmail}
                />
            </Grid>
        </React.Fragment>
    );
};

export default Email;