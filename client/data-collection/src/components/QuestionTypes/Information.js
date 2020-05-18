import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Slide from "@material-ui/core/Slide"
import Typography from "@material-ui/core/Typography"
const Information = (props) => {
    return (
        <div>
            <Slide direction="left" in={true} mountOnEnter>
            <Card>
                <CardContent>
                    <Typography style={{marginTop: 20}} variant="h3">
                        {props.header}
                    </Typography>
                    <Typography style={{marginTop: 20, textAlign: "justify"}} variant="h6">
                        {props.body}
                    </Typography>
                </CardContent>
            </Card>
            </Slide>
            {/*<button onClick={props.onNext}>NEXT</button>*/}
            <Button variant="contained" style={{marginTop: 20}} onClick={props.onNext}>
                NEXT
            </Button>
        </div>
    );
};

export default Information;
