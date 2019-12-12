import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User

  const loadUser = async () => {
    setAuthToken(localStorage.token);
    console.log('load user local storage: ' + localStorage);
    console.log('LOAD USER FUNCTION FIRED!: ' + localStorage.token);

    try {
      console.log('||||||||||||||||||||');
      const res = await axios.get('/api/v1/auth/me');
      console.log(res.data);
      console.log('LOADING USER FIRED');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      console.log('AUTH ERRORRR');
      console.log(err);
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User

  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/v1/auth/register', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      console.log('MADE IT HERE!');
      loadUser();
      console.log(res.data);
    } catch (err) {
      console.log('ERRORSSSS!!!');
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error
      });
      console.log('Error!');
      console.log(err.response.data.error);
    }
  };

  //Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/v1/auth/login', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      console.log('MADE IT HERE!');
      loadUser();
      console.log(res.data);
    } catch (err) {
      console.log('ERRORSSSS!!!');
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error
      });
      console.log('Error!');
      console.log(err.response.data.error);
    }
  };
  //  Logout
  const logout = () => dispatch({ type: LOGOUT });
  //  Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        loadUser,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
