import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../styles/Information";

const Results = (props) => {
    const classes = useStyles();
    console.log("results_available:" + props.resultsAvailable.toString());

    return (
        <div>
            <Grid container spacing={3} alignItems="center" justify="center">
                {/*result*/}
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper} elevation={1}>
                        <Typography style={{ textAlign: "justify" }} variant="h6">
                            <h1>{props.result}</h1>
                        </Typography>
                    </Paper>
                    {/*other information*/}
                    <Paper className={classes.paper} elevation={0}>
                        <Typography style={{ textAlign: "justify" }} variant="h6">
                            <p>
                                Het idee dat STEM (Science, Technology, Engineering en
                                Mathematics) niks voor meisjes is, is een boodschap die kinderen
                                al vroeg meekrijgen. Soms expliciet, maar vaker impliciet
                                bijvoorbeeld verpakt in goedbedoelde adviezen van ouders of
                                docenten. Genderstereotiepe ideeën zijn onbewust en juist
                                daardoor zo moeilijk te doorbreken. Tips om deze associatie toch
                                te doorbreken zijn:
                            </p>
                            <ul>
                                <li>
                                    Herken en erken je eigen genderstereotiepe beelden en bestrijd
                                    ze actief. Zo kun je voorkomen dat ze jouw gedrag en ideeën,
                                    en die van anderen, beïnvloeden.
                                </li>
                                <li>
                                    Herken de stereotiepe ideeën die meisjes en jongens hebben met
                                    betrekken tot gender en STEM, ontkracht deze beelden actief en
                                    bied tegenvoorbeelden aan.
                                </li>
                                <li>
                                    Wees je ervan bewust dat jouw eigen (on)zekerheid ten aanzien
                                    van STEM de interesse en het (keuze)gedrag van meisjes in jouw
                                    omgeving kan beïnvloeden
                                </li>
                            </ul>
                            <p>
                                Wilt u meer weten over gender en STEM? Bekijk dan het onderzoek
                                van [VHTO](https://www.vhto.nl/cijfers-onderzoek/onderzoek/).
                            </p>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Results;
