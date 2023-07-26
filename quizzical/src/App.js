import React from 'react'; 

function App() {

  const [homePage, setHomePage] = React.useState(true);
  const [quiz, setQuiz] = React.useState(false); 

  function startQuiz(){
     setHomePage(prevHome => !prevHome);
     setQuiz(prevQuiz => !prevQuiz );
  }

  function renderQuiz(){
    return( 
      <div>
        "Hello world!"
        <div className="TopRightShape"></div>
        <div className="ButtonLeftShape"></div>
      </div>
    )
  }

  function renderHomePage(){
    return (
    <div> 
      <h1 className="title">Quizzical</h1>
      <p className="description">Some description if needed</p>
      <button onClick={startQuiz} className="start-quiz-button">Start quiz</button>
      <div className="TopRightShape"></div>
      <div className="ButtonLeftShape"></div>
    </div> 
    )

  }

  return (
  <div> 
    
    {
      homePage? renderHomePage() : renderQuiz()
    }
    
  </div>
  );
}

export default App;
