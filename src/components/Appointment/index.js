import React from "react";

// import classNames from "classnames";
import "components/Appointment/style.scss";

export default function Appointment(props) {
  
  function getAppointment(time) {
    if (time) return "Appointment At " + time;
    return "No Appointments";
  }
  // const interviewerClass = classNames("interviewers__item", 
  //   {"interviewers__item--selected": props.selected });

    return (
      <article className="appointment">{getAppointment(props.time)}</article>     
    );
}
