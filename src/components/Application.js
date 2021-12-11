import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {

  // const [days, setDays] = useState([]);
  // const [day, setDay] = useState("Monday");

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    dailyAppointments: []
  });

  // let dailyAppointments = [];

  const setDay = day => {
    setState({ ...state, day });
  }

  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }
  
  
  const [interviewer, setInterviewer] = useState({});

  const interviewers = [
    { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
    { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
    { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
    { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
    { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
  ];


  useEffect(() => {
    // Sets the dailyAppointments on initial render and whenever state.day or state.appointments changes
    setState({ ...state, dailyAppointments : getAppointmentsForDay(state, state.day)});
    
    // NOTE ON HOW React.useEffect hook works:
    // - React state gets updated asynchronously
    // ---> When state is update asynchornously, we need a dependency 
    // ---> (as listed below in the dependency array [state.day, state.appointments])
    // The dependency array allows React to trigger a re-render and execution of code when
    // something in the dependency array change its value
    
  }, [state.day, state.appointments]);


  // useEffect(() => {
  //   const url = `http://localhost:8001/api/days`;
  //   axios.get(url).then(response => {
  //     setDays([...response.data]);
  //   });
  // }, []);

  useEffect(() => {
    //axios.get("/api/days").then(response => setDays(response.data));
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      //console.log('LOOK HERE FOR DATA FROM API =>', {days: all[0].data, appointments: all[1].data, interviewers: all[2].data});
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />

        <hr className="sidebar__separator sidebar--centered" />
        
        <nav className="sidebar__menu">
          {/* <DayList days={days} day={day} setDay={(day) => setDay(day)} /> */}
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {/* <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer}  /> */}
        {state.dailyAppointments.map(appointment => {
return          <Appointment key={appointment.id} {...appointment} />
        }
         )
        }
      </section>
    </main> 
  );
}
