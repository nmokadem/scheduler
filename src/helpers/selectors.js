export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];
  let appointments = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      appointments = dayObj.appointments;
      break;
    }
  }

  for (let i = 0; i < appointments.length; i++) {
    appointmentsArray.push(state.appointments[appointments[i]]);
  }
  return appointmentsArray;
}

export function getInterview(state, interview) {
  const thisInterview = {};
  if (interview) {
    thisInterview.student = interview.student;
    thisInterview.interviewer = interview.interviewer;
  }
  return thisInterview;
}

export function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  let interviewers = [];

  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      interviewers = dayObj.interviewers;
      break;
    }
  }

  for (let i = 0; i < interviewers.length; i++) {
    interviewersArray.push(state.interviewers[interviewers[i]]);
  }
  return interviewersArray;
}
