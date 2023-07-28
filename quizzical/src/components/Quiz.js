import React from "react";
import Answers from "./Answers.js"
export default function Quiz(props){
    const data = props.triviaData;
    console.log(props.triviaData); 
    //<h1 className="text">{props.data.results[0].question}</h1>
    //const question = data.map(element =>(<div key={element.question.id}>{element.question.value}</div>))

    const allAnswers =  data.map((item, index) => (
          <div className="container" key={index}>
            <div className="questions">{item.question.value}</div>
            {item.allAnswers.map((element, innerIndex) => (
              //<div className="answers" key={innerIndex}>{element.value}</div>
            <Answers value={element.value} 
                     isHeld={element.isHeld}
                     id={element.id}
                     />    
            ))}
          </div>
        ));
      

    return(
        <div>
            {allAnswers} 
            <div className="TopRightShape"></div>
            <div className="ButtonLeftShape"></div>
        </div> 
    )    
}