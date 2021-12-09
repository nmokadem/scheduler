import React from "react";

// import classNames from "classnames";
import "components/Appointment/style.scss";
import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button.js";

export default function Form(props) {
  
  // const interviewerClass = classNames("interviewers__item", 
  //   {"interviewers__item--selected": props.selected });
  const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  ];


  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="John Doe"
          /*
            This must be a controlled component
            your code goes here
          */
        />
      </form>
      <InterviewerList 
        interviewers={interviewers} value={2}
      />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button confirm onClick={props.onSave}>Save </Button>
      </section>
    </section>
  </main>
  );
}
