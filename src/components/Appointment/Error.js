import React from "react";

import "components/Appointment/style.scss";

//Component to display an error message in the case an error happened while deleting/saving an appointment
export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        onClick={props.onClose}
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
      />
    </main>
  );
}
