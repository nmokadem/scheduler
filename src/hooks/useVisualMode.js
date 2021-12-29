const { useState } = require("react");

//A hook that help display Components and allow the transitions from component to component
//in a LIFO manner when traversing forth and back
const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      let newHistory = [...history];
      newHistory.pop();
      setHistory([...newHistory, newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
      setMode(newMode);
    }
  };

  //Function to go back when a cancel or close button is clicked
  const back = function (step = 1) {
    if (history.length > 1) {
      setHistory((prev) => {
        const newArray = prev.slice(0, -step);
        setMode(newArray[newArray.length - 1]);
        return newArray;
      });
    }
  };

  return { mode, transition, back, history };
};

export default useVisualMode;



// -in your useVisualMode.js transition function, rather than manipulating state (history) 
// directly, consider the safe form of setting state using the previous state, such as 
// setHistory(prev => ([...prev.slice(0, prev.length - 1), newMode]))

// -consider having less padding from 12pm line to the top of each page to fill out the 
// space more.


// -MAJOR: when I try to save an appointment (assuming I'm running npm run error on the 
// server), and I click the close button of the ERROR_SAVE mode, I should be redirected to
// the FORM component appointment. Currently, I am redirected to the EMPTY component.

// -MINOR: when I try to save an appointment, and I do not select an interviewer, I should 
// see an error message. Currently, it does not display an error message.