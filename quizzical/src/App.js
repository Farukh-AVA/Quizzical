import React from 'react'; 
import StartQuiz from './components/StartQuiz.js';
import Quiz from './components/Quiz.js';
export default function App() {

  const [startQuizState, setStartQuizState] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);
  

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(data => setQuestions(data))
  }, []);
/** 
  function modifiedQuize(){
    const nweQuiz = [];
    for(let i=0; i<5; i++){
      
    }
  }
  */
  return (
    <div>
      {
        startQuizState? <StartQuiz setStartQuizState={setStartQuizState}/>:
                        <Quiz questions={questions} />
      }
    </div>
  );
}


