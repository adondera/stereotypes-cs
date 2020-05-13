import React from 'react'
import Likert from 'react-likert-scale'

const LikertScaleQuestion = (props) => {
    const likertOptions = {
        question: props.text,
        responses: [
          { value: 1, text: "Abysmal" },
          { value: 2, text: "Poor" },
          { value: 3, text: "Average" },
          { value: 4, text: "Good" },
          { value: 5, text: "Most Excellent, Ted" }
        ],
        picked: val => {
          console.log(val);
        }
      };
    return (
        <div>
            {/* LIKERT SCALE QUESTION */}
            <p>
                {props.text}
            </p>
            <img  alt="" src={props.image}/>
            <Likert {...likertOptions}/>
            <button onClick={props.onNext}>NEXT</button>
        </div>
    )
}

export default LikertScaleQuestion 