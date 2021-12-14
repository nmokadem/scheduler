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
  const captureFormInfo= () => {
    props.onSave(student, interviewer);
  }

  useEffect(() => {
    myInput.current.focus();
  },[]);
  
  const onChangeHandler = (event) => {
    //this.setSate({value:event.target.value});
    setStudent(event.target.value);
  }

  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()} >
        <input ref={myInput}
          className="appointment__create-input text--semi-bold"
          name="student"
          type="text"
          placeholder= "Enter Student Name"
          value= {student}
          onChange={onChangeHandler}
        />
      </form>
      <InterviewerList 
        interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer}
      />
    </section>

    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button confirm onClick={captureFormInfo}>Save </Button>
      </section>
    </section>
  </main>
  );
}
