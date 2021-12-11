export function getAppointmentsForDay(state, day) {
  let appointmentsArray =[];
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


// [
//   {"id":1,"name":"Monday","appointments":[1,2,3,4,5],"interviewers":[1,5,6,7,10],"spots":5},
//   {"id":2,"name":"Tuesday","appointments":[6,7,8,9,10],"interviewers":[3,4,5,8,10],"spots":1},
//   {"id":3,"name":"Wednesday","appointments":[11,12,13,14,15],"interviewers":[1,2,3,8,9],"spots":2},
//   {"id":4,"name":"Thursday","appointments":[16,17,18,19,20],"interviewers":[1,2,3,7,10],"spots":3},
//   {"id":5,"name":"Friday","appointments":[21,22,23,24,25],"interviewers":[3,7,8,9,10],"spots":4}
// ]

// {
// "1":{"id":1,"time":"12pm","interview":null},
// "2":{"id":2,"time":"1pm","interview":null},
// "3":{"id":3,"time":"2pm","interview":null},
// "4":{"id":4,"time":"3pm","interview":null},
// "5":{"id":5,"time":"4pm","interview":null},
// "6":{"id":6,"time":"12pm","interview":null},
// "7":{"id":7,"time":"1pm","interview":{"student":"Archie Cohen","interviewer":3}},
// "8":{"id":8,"time":"2pm","interview":{"student":"Chad Takahashi","interviewer":3}},
// "9":{"id":9,"time":"3pm","interview":{"student":"Jamal Jordan","interviewer":10}},
// "10":{"id":10,"time":"4pm","interview":{"student":"Leopold Silvers","interviewer":10}},
// "11":{"id":11,"time":"12pm","interview":{"student":"Liam Martinez","interviewer":8}},
// "12":{"id":12,"time":"1pm","interview":{"student":"Lydia Miller-Jones","interviewer":8}},
// "13":{"id":13,"time":"2pm","interview":null},
// "14":{"id":14,"time":"3pm","interview":null},
// "15":{"id":15,"time":"4pm","interview":{"student":"Maria Boucher","interviewer":2}},
// "16":{"id":16,"time":"12pm","interview":{"student":"Michael Chan-Montoya","interviewer":1}},
// "17":{"id":17,"time":"1pm","interview":{"student":"Richard Wong","interviewer":7}},
// "18":{"id":18,"time":"2pm","interview":null},
// "19":{"id":19,"time":"3pm","interview":null},
// "20":{"id":20,"time":"4pm","interview":null},
// "21":{"id":21,"time":"12pm","interview":null},
// "22":{"id":22,"time":"1pm","interview":null},
// "23":{"id":23,"time":"2pm","interview":null},
// "24":{"id":24,"time":"3pm","interview":{"student":"Yuko Smith","interviewer":10}},
// "25":{"id":25,"time":"4pm","interview":null}
// }