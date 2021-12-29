import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

// Initialize default values for day, days, appointments and interviewers
const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };

  //get starting data from DB
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  //Update the #of spots available for a specific day in the message # of spots remaining
  const updateSpotsCount = (appointments) => {
    let spots = 0;
    let days = [];

    for (let day of state.days) {
      if (day.name === state.day) {
        for (const idx of day.appointments) {
          if (appointments[idx].interview === null) {
            spots++;
          }
        }
        day.spots = spots;
      }
      days.push(day);
    }
    setState((prev) => ({ ...prev, days }));
  };

  // Function called when saving a new/edit and interview
  function bookInterview(id, interview) {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = "/api/appointments/" + id;
    return axios.put(url, { interview }).then(() => {
      setState({ ...state, appointments });
      updateSpotsCount(appointments);
    });
  }

// function called to delete an interview from the list as no login is required for this
// project anybody can delete any interview
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = "/api/appointments/" + id;
    return axios.delete(url, { interview }).then(() => {
      setState({ ...state, appointments });
      updateSpotsCount(appointments);
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
