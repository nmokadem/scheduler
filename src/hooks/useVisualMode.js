const { useState } = require("react");

const useVisualMode = function(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {

    if (replace) {
      setMode(newMode);
      let newHistory = [...history];
      newHistory.pop();
      setHistory([...newHistory,newMode]);
    } else {
      setHistory( prev => [...prev,newMode] );
      //setHistory(history.concat([mode]));
      setMode(newMode);
    }
    //console.log("useViualMode TRASITION ===>>",mode,history);
  };

  const back = function() {
    if (history.length > 1) {
//      setMode(history[history.length-1]);
//      setHistory(history.splice(-1,1));
      setHistory((prev) => {
        const newArray = prev.slice(0,-1);
        setMode(newArray[newArray.length-1]);
        return newArray;
      })
      //console.log("useViualMode BACK ===>>",mode,history);
    }
  };

  return { mode, transition, back, history };
};

export default useVisualMode;