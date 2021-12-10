import React, { Fragment } from 'react';

// import classNames from "classnames";
import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";

export default function Appointment(props) {
  
  function getAppointment(time) {
    if (time) return "Appointment At " + time;
    return "No Appointments";
  }
  // const interviewerClass = classNames("interviewers__item", 
  //   {"interviewers__item--selected": props.selected });

    return (
      // <article className="appointment">{getAppointment(props.time)}</article>  
      <Fragment> 
      <Header time={props.time}></Header>
      {props.interview
        ? 
        <>
          <Show interviewer={props.interview.interviewer} student={props.interview.student} onEdit={props.onEdit} onDelete={props.onDelete}/>
        </>
        :
        <>
          <Empty onAdd={props.onAdd} />
        </>
      }
    </Fragment>

    );
}
