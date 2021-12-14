import React from "react";

import "components/Appointment/style.scss";

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
