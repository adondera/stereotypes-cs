import React from "react";
import Button from "@material-ui/core/Button";

const Information = (props) => {
    return (
        <div>
            {/*<button onClick={props.onNext}>NEXT</button>*/}
            <Button variant="contained" onClick={props.onNext}>
                NEXT
            </Button>
        </div>
    );
};

export default Information;
