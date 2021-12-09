import React from "react";

// import classNames from "classnames";
import "components/Appointment/style.scss";

export default function Header(props) {
  
  // const interviewerClass = classNames("interviewers__item", 
  //   {"interviewers__item--selected": props.selected });

    return (
      <header className="appointment__time">
        <h4 className="text--semi-bold">{props.time}</h4>
        <hr className="appointment__separator" />
      </header>    
    );
}
