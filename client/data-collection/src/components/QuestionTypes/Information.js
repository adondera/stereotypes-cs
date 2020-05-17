import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
const Information = (props) => {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="body1">
                        {props.text}
                    </Typography>
                </CardContent>
            </Card>
            {/*<button onClick={props.onNext}>NEXT</button>*/}
            <Button variant="contained" style={{marginTop: 20}} onClick={props.onNext}>
                NEXT
            </Button>
        </div>
    );
};

export default Information;
