import React, { useState } from "react";

function Question(props) {
  const [selectedOption, setSelectedOption] = useState(5);
  //selectedOption will be 0,1,2,3 but never 5 so for unselected, by default I set it 5.
  //selectedOption = 5 means NOT SELECTED, so not disabled.

  const correctAnswer = props.object.answers[4];

  function handleClick(event) {
    const choice = event.target.id;
    choice == correctAnswer && props.incrementMarks();

    setSelectedOption(choice);
    console.log("Chosen: " + choice + " Correct: " + correctAnswer);
  }

  return (
    <li key={props.id}>
      {props.object.question}
      <ul>
        {props.object.answers.map(
          (choice, itemIndex) =>
            itemIndex !== 4 && (
              <li key={itemIndex}>
                <input
                  type="radio"
                  name={props.id} //each question has index from map (passed with prop)
                  value={"option" + itemIndex}
                  id={itemIndex}
                  disabled={selectedOption !== 5 ? true : false}
                  onChange={(event) => {
                    handleClick(event);
                  }}
                />
                {choice}
                {
                  //if selectedOption!==5 means to check if option is selected or not
                  //if selected, first we check each radio button to identify selected option
                  //else, if it is not the selected option, if it is correct option then return <b>Correct Answer</b>
                  selectedOption !== 5 &&
                    (selectedOption == itemIndex ? (
                      <b>
                        {selectedOption == correctAnswer ? "Correct" : "Wrong"}
                      </b>
                    ) : (
                      itemIndex == correctAnswer && <b>Correct Answer</b>
                    ))
                }
              </li>
            )
        )}
      </ul>
    </li>
  );
}

export default Question;
