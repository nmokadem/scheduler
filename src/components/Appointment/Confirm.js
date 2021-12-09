import React from "react";

// import classNames from "classnames";
import "components/Appointment/style.scss";
import Button from "components/Button";

export default function Confirm(props) {
  
  // const interviewerClass = classNames("interviewers__item", 
  //   {"interviewers__item--selected": props.selected });

    return (
      <main className="appointment__card appointment__card--confirm">
        <h1 className="text--semi-bold">Delete the appointment?</h1>
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button danger onClick={props.onConfirm}>Confirm</Button>
        </section>
      </main>
    );
}
