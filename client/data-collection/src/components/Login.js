import React from 'react'
import PropTypes from 'prop-types'
import { changeText, buttonClick } from './../actions'
import { connect } from 'react-redux' 

const Login = ({ onButtonClick, onTextChange, inputText="" }) => (
    <React.Fragment>
        <input onChange={onTextChange} value={inputText}></input>
        <button onClick={onButtonClick}></button>
        {inputText}
    </React.Fragment>
)

Login.propTypes = {
  onTextChange: PropTypes.func.isRequired,
  text: PropTypes.string
}

const mapStateToProps = state => ({
    inputText: state.loginReducer.text
})


const mapDispatchToProps = (dispatch) => ({
    onTextChange: (event) => dispatch(changeText(event)),
    onButtonClick: () => dispatch(buttonClick())
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)