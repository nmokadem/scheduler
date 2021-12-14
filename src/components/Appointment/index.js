import React from 'react';

import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Status from "components/Appointment/Status.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  //console.log("index.js ==> props ",props);

  const EMPTY  = "EMPTY";
  const SHOW   = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  function getAppointment(time) {
    if (time) return "Appointment At " + time;
    return "No Appointments";
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview) 
     .then(() => transition(SHOW));
  }

if (mode === SHOW) {
  console.log(props);
}

  return (
    // <article className="appointment">{getAppointment(props.time)}</article>  
    <article className="appointment"> 
      <Header time={props.time}></Header>

      {mode === CREATE && 
        <Form 
          interviewers={props.interviewers} 
          student="" 
          onCancel={() => back()}
          onSave={save}
        />}
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVING && <Status />}
      
      {mode === SHOW && (
        <Show student={props.interview.student} interviewer={props.interviewer.interviewer} />
      )}

    </article>
  );
}
