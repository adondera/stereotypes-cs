import {
  changePassword,
  changeUsername,
  onSubmit,
  closeErrorBar,
} from "./../actions/login";
import { connect } from "react-redux";
import Login from "../components/Login";

const mapStateToProps = (state) => ({
  password: state.loginReducer.password,
  username: state.loginReducer.username,
  isLoading: state.loginReducer.isLoading,
  errorMessage: state.loginReducer.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  onUsernameChange: (event) => dispatch(changeUsername(event)),
  onPasswordChange: (event) => dispatch(changePassword(event)),
  onSubmit: (username, password) =>
    dispatch(onSubmit(username, password, dispatch)),
  onClose: () => dispatch(closeErrorBar()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
