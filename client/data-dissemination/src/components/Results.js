import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles/Information";
import {
    responsiveFontSizes,
    ThemeProvider,
    createMuiTheme,
  } from "@material-ui/core/styles";
  //responsive font sizes
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

const Results = (props) => {
    const classes = useStyles();
    console.log("results_available:" + props.resultsAvailable.toString());

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={3} alignItems="center" justify="center" style={{marginTop: 30}}>
                {/*result*/}
                <Grid item xs={12} sm={9} >
                    <Paper className={classes.paper} elevation={1}>
                        <Typography variant="h3">
                            {props.result}
                        </Typography>
                    </Paper>
                </Grid>
                {/*other information*/}
                <Grid item xs={11} sm={11} > 
                        <Typography style={{ textAlign: "center" }} variant="body1">
                                Het idee dat STEM (Science, Technology, Engineering en
                                Mathematics) niks voor meisjes is, is een boodschap die kinderen
                                al vroeg meekrijgen. Soms expliciet, maar vaker impliciet
                                bijvoorbeeld verpakt in goedbedoelde adviezen van ouders of
                                docenten. Genderstereotiepe ideeën zijn onbewust en juist
                                daardoor zo moeilijk te doorbreken. Tips om deze associatie toch
                                te doorbreken zijn:
                          </Typography>
                </Grid>
                <Grid item xs={10} sm={10}>
                <ul>
                                <li>
                                    Herken en erken je eigen genderstereotiepe beelden en bestrijd
                                    ze actief. Zo kun je voorkomen dat ze jouw gedrag en ideeën,
                                    en die van anderen, beïnvloeden.
                                </li>
                                <br/>
                                <li>
                                    Herken de stereotiepe ideeën die meisjes en jongens hebben met
                                    betrekken tot gender en STEM, ontkracht deze beelden actief en
                                    bied tegenvoorbeelden aan.
                                </li>
                                <br/>
                                <li>
                                    Wees je ervan bewust dat jouw eigen (on)zekerheid ten aanzien
                                    van STEM de interesse en het (keuze)gedrag van meisjes in jouw
                                    omgeving kan beïnvloeden
                                </li>
                            </ul>
                            <p>
                                Wilt u meer weten over gender en STEM? Bekijk dan het onderzoek
                                van <a href='https://www.vhto.nl/cijfers-onderzoek/onderzoek/'> [VHTO] </a>
                            </p>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default Results;
