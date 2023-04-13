import React, { useState } from "react";

function Question(props) {
    
    //Not using this state right now
    const [selected,setSelected] = useState(false);

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
                  onChange={(event)=>{
                    props.select(event);
                  }}
                />
                {choice}
              </li>
            )
        )}
      </ul>
    </li>
  );
}

export default Question;
