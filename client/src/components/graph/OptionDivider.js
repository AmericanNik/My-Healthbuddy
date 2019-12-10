import React from 'react';

const OptionDivider = () => {
  return (
    <div className='optionDivider'>
      <div className='ui placeholder segment '>
        <div className='ui two column very relaxed stackable grid stackable'>
          <div className='column'>
            <div className='ui button massive green'>
              <i class='calendar plus icon'></i> New Log
            </div>
          </div>
          <div className='middle aligned column'>
            <div className='ui big button massive'>
              <i class='file alternate icon'></i>
              View Log
            </div>
          </div>
        </div>
        <div className='ui vertical divider'>Or</div>
      </div>
    </div>
  );
};

export default OptionDivider;
