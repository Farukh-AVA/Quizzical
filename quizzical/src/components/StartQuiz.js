import React from 'react';


export default function StartQuiz(props){

  function startQuiz(){
    props.setStartQuizState(prevHome => !prevHome);
    
 }

    return(
        <div> 
          <h1 className="title">Quizzical</h1>
          <p className="description">Some description if needed</p>
          <button onClick={startQuiz} className="start-quiz-button">Start quiz</button>
          <div className="TopRightShape"></div>
          <div className="ButtonLeftShape"></div>
      </div> 
    )

}