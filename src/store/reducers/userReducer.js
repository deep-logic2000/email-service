import {
    SET_LOG_IN,
    SET_LOG_OUT,
    SET_CURRENT_USER
  } from "../actions/userActions";

  const initialValues = {
    isLoggedIn: false,
    currentUser: {},
  };

  const userReducer = (state = initialValues, { type, payload } = {}) => {
    switch (type) {
        case SET_LOG_IN:
            localStorage.setItem('isLoggedInEmailService', true);
            return {
                ...state,
                isLoggedIn: payload,
            };
        case SET_LOG_OUT:
            localStorage.setItem('isLoggedInEmailService', false);
            return {
            ...state,
            isLoggedIn: payload,
            };
        case SET_CURRENT_USER:
            return {
            ...state,
            currentUser: payload,
            };

      default:
        return state;
    }
  };

  export default userReducer;
