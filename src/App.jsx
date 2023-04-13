import { useState } from "react";
import Question from "./Question";

function App() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);

  function handleChange(event) {
    setTopic(event.target.value);
  }

  //OpenAI API function:

  async function callAPI() {
    console.log("Calling the OpenAI API");

    const apiKey = import.meta.env.VITE_REACT_API_KEY; //Enter your own API Key from openai account to make this work

    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            `Create a JavaScript array of 2 objects with ` +
            topic +
            ` related random and unique questions, each including a question and a set of four multiple choice answers. Use the last index position of the answer array to indicate the correct answer. Example format: [{"question":"question?","answers":["option1","option2","option3","option4",4]. const quiz=`,
        },
      ],
    };

    //fetch() is a javascript function for getting data.
    //Endpoint is passed in brackets.
    //It needs method, headers and body to send request.

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify(APIBody), //APIBody is declared above we just pass it here.
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        //data means the response from the OpenAI API.
        console.log(data);

        const quizString = data.choices[0].message.content;

        const quizArray = eval(quizString);
        setQuiz(quizArray); //sets state to our response in array format.
      });
  }

  //========Question Component handling========

  function handleSelect(event) {
    let questionSelected = event.target.name;
    let choice = event.target.id;
    const correctAnswer = quiz[questionSelected].answers[4];
    console.log("Chosen: " + choice + " Correct: " + correctAnswer);
  }

  

  return (
    <div className="App">
      <input
        onChange={handleChange}
        type="text"
        name="topic"
        placeholder="Enter topic"
        value={topic}
      />
      <button onClick={callAPI}>Create Quiz</button>
      <ul>
        {quiz.map((item, quizIndex) => (
          <Question
            object={item}
            key={quizIndex}
            id={quizIndex}
            select={handleSelect}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
