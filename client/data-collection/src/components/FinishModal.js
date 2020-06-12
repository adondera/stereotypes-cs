import "../styles/Question.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Modal, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

const FinishModal = ({ show, handleCloseQuiz, handleCloseModal, onSkipQuiz }) => {
  const classes = useStyles();
  const textRef = React.createRef()


  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={show}
      onClose={handleCloseModal}
      closeAfterTransition
    >
      <Fade in={show}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Please confirm closing quiz.</h2>
          <h5 id="transition-modal-description">
            Confirm by entering the code and clicking on one of the options (send: data is sent, remove: data is removed).
          </h5>
          <TextField inputRef={textRef} autoFocus={true}  inputProps={{style: {textAlign: "center"}}}/>
          <br/>
          <Button
            style={{ margin: "auto", marginTop: 10}}
            variant='contained'
            color='secondary'
            onClick={() => {
              if(textRef.current.value === "NEMO"){
                handleCloseModal();
                handleCloseQuiz();
              }
            }}
          >
            Remove
          </Button>
          <br/>
          <Button
            variant='contained'
            color='primary'
            style={{ margin: "auto", marginTop: 10 }}
            onClick={() => {
              if(textRef.current.value === "NEMO"){
                handleCloseModal();
                onSkipQuiz()
              }
            }}
          >
            Send
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};


export default FinishModal;
