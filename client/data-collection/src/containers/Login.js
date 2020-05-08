import { changePassword, changeUsername, onSubmit } from './../actions'
import { connect } from 'react-redux' 
import Login from '../components/Login'

const mapStateToProps = (state) => ({
  password: state.loginReducer.password,
  username: state.loginReducer.username,
});

const mapDispatchToProps = (dispatch) => ({
  onUsernameChange: (event) => dispatch(changeUsername(event)),
  onPasswordChange: (event) => dispatch(changePassword(event)),
  onSubmit: (username, password) => dispatch(onSubmit(username, password))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
