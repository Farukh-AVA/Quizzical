import React from "react";

export default function Quiz(props){
    console.log(props.questions.results)
    return(
        <div>    
            <h1 className="text">{props.questions.results[0].question}</h1>
            <div className="TopRightShape"></div>
            <div className="ButtonLeftShape"></div>
        </div> 
    )    
}