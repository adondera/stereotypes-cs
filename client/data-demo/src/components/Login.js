import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    marginTop: theme.spacing(5),
  },
}));
const Login = ({
  onSubmit,
  onUsernameChange,
  onPasswordChange,
  onClose,
  username = "",
  password = "",
  errorMessage = "",
  isLoading = false,
}) => {
  const classes = useStyles();

  return (
    <Switch>
      <Route path="/login">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                disabled={isLoading}
                fullWidth
                value={username}
                onChange={onUsernameChange}
                id="username"
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                disabled={isLoading}
                onChange={onPasswordChange}
                value={password}
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              {errorMessage === "" ? null : (
                <Alert
                  open={errorMessage !== ""}
                  onClose={onClose}
                  severity="error"
                >
                  {errorMessage}
                </Alert>
              )}
              {/* )} */}
              {isLoading ? (
                <LinearProgress className={classes.root} />
              ) : (
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => onSubmit(username, password)}
                  className={classes.submit}
                >
                  Sign In
                </Button>
              )}
            </form>
          </div>
        </Container>
      </Route>
    </Switch>
  );
};

Login.propTypes = {
  onUsernameChange: PropTypes.func,
  onPasswordChange: PropTypes.any,
  errorMessage: PropTypes.string,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  username: PropTypes.string,
  password: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Login;
