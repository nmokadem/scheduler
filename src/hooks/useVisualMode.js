const { useState } = require("react");

const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {

    if (replace) {
      setMode(mode);
    } else {
      setHistory(history.push(mode));
      setMode(newMode);
    }
  };

  const back = function() {
    setMode( setHistory(history.pop()) );
  };

  // Don't forget this!  history is needed here
  return { mode, transition, back, history };
};

export default useVisualMode;