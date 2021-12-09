import React from "react";

import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpots = (spots) => {
  if (spots === 0) {
    return "no spots remaining";
  }
  if (spots === 1) {
    return "1 spot remaining";
  }
  return spots + " spots remaining";
}

export default function DayListItem(props) {
//console.log(props.selected);



  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

    // <li className={interviewerClass} onClick={props.setInterviewer}>

  return (
    // <li className={dayClass} onClick={() => props.setDay(props.name)} selected={props.selected}>
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>  );
}
