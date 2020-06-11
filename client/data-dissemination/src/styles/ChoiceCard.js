import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    cardCorrect: {
        flexGrow: 1,
        height: '120%',
        color: 'green',
    },
    cardIncorrect: {
        flexGrow: 1,
        height: '120%',
        color: 'red'
    },
    textContent: {
        textAlign: 'center',
        height: '100%',
    },
    cardContent: {
        height: '100%',
        opacity: '0.3',
    }
}));
