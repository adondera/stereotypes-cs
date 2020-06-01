import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
const ValidateConsentInput = function (input) {
    var letters = /^[A-Za-z\-\s]+$/;
    if (input.length === 0 || input.match(letters)) return true;
    return false;
};
const Parent = (props) => {
    const onChangeFirstName = (event) => {
        var newParent = props.component.state.parent;
        if (ValidateConsentInput(event.target.value))
            newParent.firstName = event.target.value;
        newParent.isValid =
            newParent.lastName.length > 0 && newParent.firstName.length > 0;
        props.component.setState({ parent: newParent });
    };
    const onChangeLastName = (event) => {
        var newParent = props.component.state.parent;
        if (ValidateConsentInput(event.target.value))
            newParent.lastName = event.target.value;
        newParent.isValid =
            newParent.lastName.length > 0 && newParent.firstName.length > 0;
        props.component.setState({ parent: newParent });
    };
    return (
        <React.Fragment>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    name={props.firstName}
                    label="Voornaam van de ouder"
                    value={props.firstName}
                    autoComplete="fname"
                    onChange={onChangeFirstName}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    name={props.lastName}
                    label="Achternaam van de ouder"
                    value={props.lastName}
                    autoComplete="lname"
                    onChange={onChangeLastName}
                />
            </Grid>
        </React.Fragment>
    );
};

export default Parent;
