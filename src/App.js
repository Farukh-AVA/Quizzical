

import React from 'react'; 
import StartQuiz from './components/StartQuiz.js';
import Quiz from './components/Quiz.js';

export default function App() {

  const [startQuizState, setStartQuizState] = React.useState(true);

  return (
    <div>
      {
        startQuizState? <StartQuiz setStartQuizState={setStartQuizState}/>:
                        <Quiz/>
      }
    </div>
  );
}


