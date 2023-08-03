import React from "react";


export default function Answers(props){

    let styles = {}

        if(props.showResults){
            styles = {
                backgroundColor: props.answerId === props.correctAnswerId? "#94D7A2" : 
                                 props.isHeld && props.answerId !== props.correctAnswerId? "#F8BCBC" :"#FFF",
                                 opacity:  props.answerId === props.correctAnswerId ? 1 : 0.5
            }
        }else{
            styles = { backgroundColor: props.isHeld ? "#D6DBF5" : "#FFF"}
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