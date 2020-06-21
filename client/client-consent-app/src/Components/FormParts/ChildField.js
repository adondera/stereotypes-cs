import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
const ValidateConsentInput = function (input) {
    var letters = /^[A-Za-z\-\s]+$/;
    if (input.length === 0 || input.match(letters)) return true;
    return false;
};
const Child = (props) => {
    const onChangeLastName = (id) => (event) => {
        var newChildren = props.component.state.children;
        if (ValidateConsentInput(event.target.value))
            newChildren[id].lastName = event.target.value;
        newChildren[id].isValid =
            newChildren[id].lastName.length > 0 &&
            newChildren[id].firstName.length > 0;
        props.component.setState({ children: newChildren });
    };

    const onChangeFirstName = (id) => (event) => {
        var newChildren = props.component.state.children;
        if (ValidateConsentInput(event.target.value))
            newChildren[id].firstName = event.target.value;
        newChildren[id].isValid =
            newChildren[id].lastName.length > 0 &&
            newChildren[id].firstName.length > 0;
        props.component.setState({ children: newChildren });
    };

    return (
        <React.Fragment>
            <Grid item xs={6} sm={6}>
                <TextField
                    fullWidth
                    name={props.firstName}
                    label="Voornaam kind*"
                    value={props.firstName}
                    autoComplete="fname"
                    onChange={onChangeFirstName(props.id)}
                />
            </Grid>
            <Grid item xs={6} sm={6}>
                <TextField
                    fullWidth
                    name={props.lastName}
                    label="Achternaam kind*"
                    value={props.lastName}
                    autoComplete="lname"
                    onChange={onChangeLastName(props.id)}
                />
            </Grid>
        </React.Fragment>
    );
};

export default Child;
