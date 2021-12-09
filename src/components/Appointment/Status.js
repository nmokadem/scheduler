import React from "react";

// import classNames from "classnames";
import "components/Appointment/style.scss";

export default function Status(props) {
  
  // const interviewerClass = classNames("interviewers__item", 
  //   {"interviewers__item--selected": props.selected });

  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">Deleting</h1>
    </main>
  );
}
