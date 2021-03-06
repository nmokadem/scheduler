import React from "react";

import "components/Appointment/style.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Status from "components/Appointment/Status.js";
import Error from "components/Appointment/Error.js";
import Form from "components/Appointment/Form.js";
import Confirm from "components/Appointment/Confirm.js";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE ";
  const ERROR_DELETE = "ERROR_DELETE ";

  function getAppointment(time) {
    if (time) return "Appointment At " + time;
    return "No Appointments";
  }

  const { mode, transition, back } = useVisualMode(
    props.interview && props.interview.hasOwnProperty("student") ? SHOW : EMPTY
  );

// save a new/edit interview on success display the appointment in a SHOW mode
// On error display ERROR_SAVE mode
  function save(name, interviewer) {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer,
      };
      transition(SAVING);
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true));
    }
  }


// Delete a appointment. On succes transition to an EMPTY mode for the time slot (1Hour)
// On  erro transition to the ERROR_DELETE mode
  function cancelBooking(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING);

    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  const getInterviewerName = (id) => {
    for (let interviewer of props.interviewers) {
      if (interviewer.id === id) {
        return interviewer.name;
      }
    }
    return "";
  };

  return (
    <article className="appointment">
      <Header time={props.time}></Header>

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          student=""
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={() => back()}
          onSave={save}
        />
      )}

      {mode === CONFIRM && (
        <Confirm onCancel={() => back()} onConfirm={cancelBooking} />
      )}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}

      {mode === ERROR_SAVE && (
        <Error
          message="Error in Saving Appointment! Contact Support."
          onClose={() => transition('EDIT',true)}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Error in Deletign Appointment! Contact Support."
          onClose={() => back()}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={getInterviewerName(props.interview.interviewer)}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
    </article>
  );
}
