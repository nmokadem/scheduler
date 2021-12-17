import React, { useState, useRef, useEffect } from "react";

import "components/Appointment/style.scss";
import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button.js";

//Component to add/edit an appointment
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const myInput = useRef();

  useEffect(() => {
    myInput.current.focus();
  }, []);

  //Reset clear the input fields
  const reset = () => {
    setStudent("");
    setError("");
    setInterviewer(null);
  };

  const onCancel = () => {
    reset();
    props.onCancel();
  };

  const onChangeHandler = (event) => {
    //this.setSate({value:event.target.value});
    setStudent(event.target.value);
    setError("");
  };

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            ref={myInput}
            className="appointment__create-input text--semi-bold"
            name="student"
            data-testid="student-name-input"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={onChangeHandler}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={onCancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save{" "}
          </Button>
        </section>
      </section>
    </main>
  );
}
