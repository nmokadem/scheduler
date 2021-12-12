import React from 'react';

import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
//console.log("index.js ==> props ",props);

  function getAppointment(time) {
    if (time) return "Appointment At " + time;
    return "No Appointments";
  }

  const EMPTY  = "EMPTY";
  const SHOW   = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    // <article className="appointment">{getAppointment(props.time)}</article>  
    <article className="appointment"> 
      <Header time={props.time}></Header>

      {/* {props.interview
        ? 
          <Show interviewer={props.interviewer.interviewer} student={props.interview.student} onEdit={props.onEdit} onDelete={props.onDelete}/>
        :
          <Empty onAdd={props.onAdd} />
      } */}




      {mode === CREATE && <Form interviewers={props.interviewers} student="" onCancel={() => back()} />}
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {mode === SHOW && (
        <Show student={props.interview.student} interviewer={props.interviewer.interviewer} />
      )}

    </article>
  );
}
