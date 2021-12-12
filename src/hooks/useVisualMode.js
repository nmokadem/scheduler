const { useState } = require("react");

const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {

    if (replace) {
      setMode(mode);
    } else {
      setHistory(history.concat([mode]));
      //setHistory(history.push(mode));
      setMode(newMode);
    }
    console.log("TRASITION ===>>",mode,history);
  };

  const back = function() {
    setMode(history[history.length-1]);
    setHistory(history.splice(-1,1));
    console.log("BACK ===>>",mode,history);
  };

  return { mode, transition, back, history };
};

export default useVisualMode;