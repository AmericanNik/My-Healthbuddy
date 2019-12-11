import React from 'react';

const ValidationBox = props => {
  const { password, confirmPassword } = props;

  let validationSwitch = {
    lowerPass: false,
    upperPass: false,
    numberPass: false,
    specialPass: false,
    lengthPass: false,
    matchPass: false,
    validPass: false
  };

  //At least 1 lowercase
  const lowerCase = new RegExp('^(?=.*[a-z])');
  //At least 1 uppercase
  const upperCase = new RegExp('^(?=.*[A-Z])');
  //At least 1 number
  const hasNumber = new RegExp('^(?=.*[0-9])');
  //At least 1 special character
  const specialChar = new RegExp('^(?=.*[!@#$%^&])');

  const testPassword = password => {
    //lowercase test
    if (lowerCase.test(password)) {
      validationSwitch.lowerPass = true;
    } else {
      validationSwitch.lowerPass = false;
      validationSwitch.validPass = false;
    }
    //Upppercase test
    if (upperCase.test(password)) {
      validationSwitch.upperPass = true;
    } else {
      validationSwitch.upperPass = false;
      validationSwitch.validPass = false;
    }
    //Has Number test
    if (hasNumber.test(password)) {
      validationSwitch.numberPass = true;
    } else {
      validationSwitch.numberPass = false;
      validationSwitch.validPass = false;
    }
    //Has Special Char test
    if (specialChar.test(password)) {
      validationSwitch.specialPass = true;
    } else {
      validationSwitch.specialPass = false;
      validationSwitch.validPass = false;
    }

    //Has at least 8 test

    if (password.length >= 8) {
      validationSwitch.lengthPass = true;
    } else {
      validationSwitch.lengthPass = false;
      validationSwitch.validPass = false;
    }

    if (password === confirmPassword && confirmPassword !== '') {
      validationSwitch.matchPass = true;
    } else {
      validationSwitch.matchPass = false;
      validationSwitch.validPass = false;
    }

    if (
      validationSwitch.lowerPass === true &&
      validationSwitch.upperPass === true &&
      validationSwitch.numberPass === true &&
      validationSwitch.specialPass === true &&
      validationSwitch.lengthPass === true &&
      validationSwitch.matchPass === true
    ) {
      validationSwitch.validPass = true;
    }
  };

  testPassword(password);

  return (
    <div>
      {props.password !== '' ? (
        <div>
          <ul className='validationUl'>
            <li>
              {validationSwitch.lowerPass === false ? (
                <span className='fail'>
                  <i className='fas fa-times'></i>Does not have 1 lower case
                  character.
                </span>
              ) : (
                <span className='pass'>
                  <i className='fas fa-check'></i>At least 1 lower case!
                </span>
              )}
            </li>
            <li>
              {validationSwitch.upperPass === false ? (
                <span className='fail'>
                  <i className='fas fa-times'></i>Does not have 1 upper case
                  character.
                </span>
              ) : (
                <span className='pass'>
                  <i className='fas fa-check'></i>At least 1 upper case!
                </span>
              )}
            </li>
            <li>
              {validationSwitch.numberPass === false ? (
                <span className='fail'>
                  <i className='fas fa-times'></i>Does not have 1 number
                  character.
                </span>
              ) : (
                <span className='pass'>
                  <i className='fas fa-check'></i>At least 1 number character!
                </span>
              )}
            </li>
            <li>
              {validationSwitch.specialPass === false ? (
                <span className='fail'>
                  <i className='fas fa-times'></i>Does not have 1 special
                  character.
                </span>
              ) : (
                <span className='pass'>
                  <i className='fas fa-check'></i>At least 1 special character!
                </span>
              )}
            </li>
            <li>
              {validationSwitch.lengthPass === false ? (
                <span className='fail'>
                  <i className='fas fa-times'></i>Is not at least 8 characters
                </span>
              ) : (
                <span className='pass'>
                  <i className='fas fa-check'></i>At least 8 characters!
                </span>
              )}
            </li>
            <li>
              {validationSwitch.matchPass === false ||
              props.confirmPassword === '' ? (
                <span className='fail'>
                  <i className='fas fa-times'></i>Passwords do not match
                </span>
              ) : (
                <span className='pass'>
                  <i className='fas fa-check'></i>Passwords Match!
                </span>
              )}
            </li>
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ValidationBox;
