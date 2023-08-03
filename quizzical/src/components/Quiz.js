import React from "react";
import Answers from "./Answers.js"
import { nanoid } from 'nanoid'
import {encode} from 'html-entities';
export default function Quiz(){
    const [triviaData, setTriviaData] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false);
    const [userCorrectAnswers, setUserCorrectanswers] = React.useState(0);
    const [newGame, setNewGame] = React.useState(false);

    React.useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => setTriviaData(filteringData(data.results)))
    }, [newGame]); 

   const correctAnswers = triviaData.map(item => item.correct_answer); 
    function filteringData(data) {
      const filteredData = [];
    
      for (let i = 0; i < 5; i++) {
        let correct_answer = { value: data[i].correct_answer, id: nanoid(), isHeld: false };
        let incorrect_answers = data[i].incorrect_answers.map((element) => {
          return { value: element, id: nanoid(), isHeld: false };
        });
    
        filteredData.push({
          question: { value: encode(data[i].question), id: nanoid()},
          correct_answer: correct_answer,
          incorrect_answers: incorrect_answers,
          allAnswers: shuffleAnswers(correct_answer, incorrect_answers.concat())
        });
      }
    
      return filteredData;
    }
  
    function shuffleAnswers(correct_answer, incorrect_answers){
  
      const randomIndex = Math.floor(Math.random() * (incorrect_answers.length + 1));
      incorrect_answers.splice(randomIndex, 0, correct_answer);
  
      return encode(incorrect_answers);
    }




  function quiz(data){
    const quiz = [];
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const answers = [];
      for (let innerIndex = 0; innerIndex < 4; innerIndex++) {
        const element =  item.allAnswers[innerIndex];
        answers.push(
          <Answers
            key={element.id}
            answerId={element.id}
            value={element.value}
            isHeld={element.isHeld}
            holdAnswer={() => holdAnswer(element.id)}
            correctAnswerId={item.correct_answer.id}
            showResults={showResults}
          />
        );
      }
     
      quiz.push(
        <div className="container" key={index}>
          <div className="questions">{item.question.value}</div>
          <div className="allAnswersContainer">{answers}</div>
          <div className="horizontal-line"></div>
        </div>
      );
    }
    return quiz; 
  }

function holdAnswer(id) {
  setTriviaData((prevData) => {
    const updatedData = prevData.map((item) => {
      const updatedAnswers = item.allAnswers.map((answer) =>
        answer.id === id ? { ...answer, isHeld: !answer.isHeld } : answer
      );
      return { ...item, allAnswers: updatedAnswers };
    });
    return updatedData;
  });
}

function resetHoldAnswers(){
  setTriviaData((prevData) => {
    const updatedData = prevData.map((item) => {
      const updatedAnswers = item.allAnswers.map((answer) =>{
        return {...answer, isHeld: false}
    });
      return { ...item, allAnswers: updatedAnswers };
    });
    return updatedData;
  });
}

  function checkAnswers(){
    setShowResults(true); 
    let userCorrectAnswers = 0;
    for (let index = 0; index < correctAnswers.length; index++) {
      const correctAnswerId = correctAnswers[index].id;
      for (let innerIndex = 0; innerIndex < 4; innerIndex++) {
        let userAnswerId = triviaData[index].allAnswers[innerIndex].id;
        let userChoice = triviaData[index].allAnswers[innerIndex].isHeld
        if(userAnswerId === correctAnswerId && userChoice){
          userCorrectAnswers+=1;
        }else{
          continue;
        }
      }
    }
    //console.log(userCorrectAnswers)
    setUserCorrectanswers(userCorrectAnswers); 
  }

  function toggleGame(){
    setNewGame(!newGame);
    setShowResults(false);
    setUserCorrectanswers(0); 
    resetHoldAnswers(); 
    
  }
          
    return(
      <div>
        {!showResults?
          <div>
            {quiz(triviaData)} 
            <button className="check-answers" onClick={checkAnswers}>Check Answers</button>
            <div className="TopRightShape"></div>
            <div className="ButtonLeftShape"></div>
          </div> :
          <div>
            {quiz(triviaData)} 
            <button className="check-answers" onClick={toggleGame}>New Game</button>
            <div className="results">{userCorrectAnswers}/5</div>
            <div className="TopRightShape"></div>
            <div className="ButtonLeftShape"></div>
          </div>
        }  
      </div>
    )    
}