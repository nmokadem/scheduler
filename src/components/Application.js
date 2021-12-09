import React, { useState } from "react";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";

import "components/Application.scss";

export default function Application(props) {

  const [day, setDay] = useState("Monday");
  const [selected, setSelected] = useState(false);

  const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  ];

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />

        <hr className="sidebar__separator sidebar--centered" />
        
        <nav className="sidebar__menu">
          {/* <DayList days={days} day={day} setDay={(day) => setDay(day)} /> */}
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {/* <InterviewerList interviewers={interviewers} selected={selected} setSelected={(selected) => setSelected(selected) } /> */}
        <InterviewerList interviewers={interviewers} value={selected} onChange={setSelected} />
 
      </section>

    </main> 
  );
}
