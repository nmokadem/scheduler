import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    dailyAppointments: [],
    dailyInterviewers: []
  });

  const setDay = day => {
    setState({ ...state, day });
  }

  useEffect(() => {
    // Sets the dailyAppointments on initial render and whenever state.day or state.appointments changes
    setState({ ...state, dailyAppointments : getAppointmentsForDay(state, state.day)});    
    // Sets the dailyInterviewers on initial render and whenever state.day or state.interviewers changes
    //setState({ ...state, dailyInterviewers : getInterviewersForDay(state, state.day)});    
  }, [state.day, state.appointments, state.interviewers]);


  // useEffect(() => {
  //   // Sets the dailyInterviewers on initial render and whenever state.day or state.interviewers changes
  //   setState({ ...state, dailyInterviewers : getInterviewersForDay(state, state.day)});    
  // }, [state.day, state.interviewers]);

  //let dailyInterviewers = getInterviewersForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      //console.log('LOOK HERE FOR DATA FROM API =>', {days: all[0].data, appointments: all[1].data, interviewers: all[2].data});
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = "/api/appointments/" + id;
    return axios.put(url,{interview}).then( () => setState({...state, appointments}));
  }

  function cancelInterview(id,interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = "/api/appointments/" + id;
    return axios.delete(url,{interview})
      .then( () => setState({...state, appointments}));
  }

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
            return <Appointment key={appointment.id} {...appointment} 
            interviewer={getInterview(state,appointment.interview)} 
            interviewers={getInterviewersForDay(state, state.day)}
            //onChange={setInterviewer}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            />
          })
        }
        <Appointment time="5pm"/>
      </section>
    </main> 
  );
}
