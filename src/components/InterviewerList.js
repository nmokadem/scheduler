import React from "react";
import PropTypes from "prop-types"

import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  //console.log("InterviewerList props ==>",props);
  const interviewers = props.interviewers.map((interviewer) => {
    return (
        <InterviewerListItem 
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.interviewer}
          setInterviewer={() => props.setInterviewer(interviewer.id)}
        />
    );
  });

  //As a safeguard to insure that interviewers in props is an array.
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  };
  
  return(
    <ul>
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
    </ul>
  )
}