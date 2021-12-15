import React, { useState, useRef, useEffect } from "react";

// import classNames from "classnames";
import "components/Appointment/style.scss";
import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button.js";

export default function Form(props) {
//console.log("Form props : ",props);

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const myInput = useRef()

  // const captureFormInfo= () => {
  //   props.onSave(student, interviewer);
  // }

  useEffect(() => {
    myInput.current.focus();
  },[]);
  
  const onChangeHandler = (event) => {
    //this.setSate({value:event.target.value});
    setStudent(event.target.value);
    setError("");
  }


  const [error, setError] = useState("");
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
      <form autoComplete="off" onSubmit={event => event.preventDefault()} >

        <input ref={myInput}
          className="appointment__create-input text--semi-bold"
          name="student"
          data-testid="student-name-input"
          type="text"
          placeholder= "Enter Student Name"
          value= {student}
          onChange={onChangeHandler}
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList 
        interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer}
      />
    </section>

    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button confirm onClick={validate}>Save </Button>
      </section>
    </section>
  </main>
  );
}
