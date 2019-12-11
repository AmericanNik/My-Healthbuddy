import React from 'react';
import { Link } from 'react-router-dom';

const OptionDivider = () => {
  return (
    <div className='optionDivider'>
      <div className='ui placeholder segment '>
        <div className='ui two column very relaxed stackable grid stackable'>
          <div className='column'>
            <Link to='/logs'>
              <div className='ui button massive green'>
                <i className='calendar plus icon'></i> New Log
              </div>
            </Link>
          </div>
          <div className='middle aligned column'>
            <div className='ui big button massive'>
              <i className='file alternate icon'></i>
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
