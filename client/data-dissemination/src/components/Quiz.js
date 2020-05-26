import React from "react";
import { createQuizComponent } from '../hoc/createQuizComponent'
class Quiz extends React.Component {
    render() {
        return <div questionindex={1}>{this.props.children}</div>;
    }
};

export default createQuizComponent(Quiz)

