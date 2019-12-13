import React from 'react';
import './SubmitLog.css';

const onSubmitLogButtonClick = () => {
  console.log('SUBMIT LOG!!');
};

const SubmitLog = props => {
  const onLogSubmit = e => {
    console.log('Journal Entry: ' + props.journalEntry);
    console.log('LogTime: ' + props.logTime);
    console.log('Overall Wellbeing: ' + props.overallWellbeing);
    console.log('Daily Activity: ' + props.dailyActivity);
    console.log('Conditions: ' + props.conditions);
    console.log('Atmospheric Data' + props.atmosphericData);
  };

  return (
    <div className='submitLogButtonContainer'>
      <div className='submitLogButton' onClick={onLogSubmit}>
        <h2>Submit Log</h2>
      </div>
    </div>
  );
};

export default SubmitLog;
