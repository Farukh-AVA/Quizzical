import React from "react";
import Answers from "./Answers.js"
export default function Quiz(props){
    const data = props.triviaData;
    //console.log(props.triviaData); 

    const [allAnswers, setAllAnswers] = React.useState(data.map(item => item.allAnswers));
    //console.log(props.triviaData); 
    console.log(allAnswers); 
    
  /*
    const quiz =  data.map((item, index) => (
          <div className="container" key={index}>
            <div className="questions">{item.question.value}</div>
            {item.allAnswers.map((element, innerIndex) => (
            <Answers 
                     key = {element.id}
                     value={element.value} 
                     isHeld={element.isHeld}
                     id={element.id}
                     />    
            ))}
          </div>
        ));
  */   
  function quiz(data){
    const quiz = [];
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const answers = [];

      for (let innerIndex = 0; innerIndex < item.allAnswers.length; innerIndex++) {
        const element = allAnswers[index][innerIndex];
        answers.push(
          <Answers
            key={element.id}
            value={element.value}
            isHeld={element.isHeld}
            holdAnswer={() => holdAnswer(element.id)}
          />
        );
      }

      function holdAnswer(id){
        setAllAnswers(oldAllAnswers => oldAllAnswers.map(outerLoop =>(
          outerLoop.map(answer => {
            return answer.id === id ?
                   {...answer, isHeld: !answer.isHeld}:
                   answer
          })
        )))
      }

      quiz.push(
        <div className="container" key={index}>
          <div className="questions">{item.question.value}</div>
          <div className="allAnswersContainer">{answers}</div>
        </div>
      );
    }
    return quiz; 
  }
          
    return(
        <div>
            {quiz(data)} 
            <div className="TopRightShape"></div>
            <div className="ButtonLeftShape"></div>
        </div> 
    )    
}