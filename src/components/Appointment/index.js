import React from 'react';

import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Status from "components/Appointment/Status.js";
import Form from "components/Appointment/Form.js";
import Confirm from "components/Appointment/Confirm.js";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  //console.log("index.js ==> props ",props);

  const EMPTY  = "EMPTY";
  const SHOW   = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";


  function getAppointment(time) {
    if (time) return "Appointment At " + time;
    return "No Appointments";
  }

  //Object.keys(props.interview).length === 0
  const { mode, transition, back } = useVisualMode(
    props.interview.hasOwnProperty('student') ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING);
      props.bookInterview(props.id, interview) 
      .then(() => transition(SHOW));
    }
  }

  function cancelBooking(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING);

    props.cancelInterview(props.id, interview) 
     .then(() => transition(EMPTY));
  }

  const getInterviewrName = (id) => {
   for (let interviewer of props.interviewers) {
     if (interviewer.id === id) {
       return interviewer.name;
     }
   }
   return '';  //none found
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

      {mode === EDIT &&
        <Form 
          interviewers={props.interviewers}
          student = {props.interview.student}
          interviewer = {props.interview.interviewer}
          onCancel={() => back()}
          onSave={save}
        />}

      {mode === CONFIRM && 
        <Confirm
          onCancel={() => back()}
          onConfirm={cancelBooking}
        />}

      {mode === EMPTY && <Empty onAdd = {() => transition(CREATE)} />}

      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      
      {mode === SHOW && (
        <Show 
          student = {props.interview.student} 
          interviewer = {getInterviewrName(props.interview.interviewer)} 
          onDelete = {() => transition(CONFIRM)} 
          onEdit = {() => transition(EDIT)}
        /> 
      )}

    </article>
  );
}
