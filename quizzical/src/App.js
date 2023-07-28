/*
1.Filtering Data
    -question
      decode the question with library  
    -correct_answer
      id
      value
      isHeld
    -incorrect_answer
      id
      value
      isHels
2.Create new Array insert object with correct and incorrect answers. 
  Set that array to questioin state.  
*/

import React from 'react'; 
import StartQuiz from './components/StartQuiz.js';
import Quiz from './components/Quiz.js';
import { nanoid } from 'nanoid'
import {encode} from 'html-entities';
export default function App() {

  const [startQuizState, setStartQuizState] = React.useState(true);
  const [triviaData, setTriviaData] = React.useState([]);
  

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => setTriviaData(filteringData(data.results)))
  }, []); 

 
  function filteringData(data) {
    const filteredData = [];
  
    for (let i = 0; i < 5; i++) {
      let correct_answer = { value: data[i].correct_answer, id: nanoid(), isHeld: false };
      let incorrect_answers = data[i].incorrect_answers.map((element) => {
        return { value: element, id: nanoid(), isHeld: false };
      });
  
      filteredData.push({
        question: { value: encode(data[i].question, {mode: 'nonAsciiPrintable'}), id: nanoid()},
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

    return incorrect_answers;
  }

  return (
    <div>
      {
        startQuizState? <StartQuiz setStartQuizState={setStartQuizState}/>:
                        <Quiz triviaData={triviaData}/>
      }
    </div>
  );
}


