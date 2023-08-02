import React from "react";

export default function Answers(props){

    const styles = {
        backgroundColor: props.isHeld ? "#D6DBF5" : "white"
    }
    return(
        <div className="allAnswers"
            style={styles}
            onClick={props.holdAnswer}
        >    
            <div className="answers-value">{props.value}</div>
        </div>
    )
}