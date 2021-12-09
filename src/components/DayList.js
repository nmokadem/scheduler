import React from "react";

import DayListItem from "components/DayListItem";

export default function DayList(props) {

  const dayListItems = props.days.map(day => 
        <DayListItem
          key={day.id} 
          name={day.name} 
          spots={day.spots} 
          selected={day.name === day.value}
          setDay={props.onChange}
        />);
        
  return(
    <ul>
      {dayListItems}
    </ul>
  )
}

