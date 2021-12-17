import React from "react";

import "components/Appointment/style.scss";

//Component with an add button to make an appointment for this time slot
export default function Header(props) {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
