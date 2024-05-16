import {
    GET_ALL_EMAILS,
    NEW_ERROR,
    SET_ACTIVE_TABLE_PAGE,
    SET_ROWS_AMOUNT_PER_PAGE,
    SET_TOTAL_EMAILS_COUNT,
  } from "../actions/emailsActions";
//   import { getItemFromLS, setItemToLS } from "../../utils/localStorage";

  const initialValues = {
    emails: [],
    error: "",
    activePage: 0,
    totalEmails: 0,
    rowsPerPage: 5,
  };

  const emailReducer = (state = initialValues, { type, payload } = {}) => {
    switch (type) {
        case GET_ALL_EMAILS:
            return {
            ...state,
            emails: payload.results,
            totalEmails: payload.count,
            };
        case NEW_ERROR:
            return {
            ...state,
            error: payload.message,
            };
        case SET_ACTIVE_TABLE_PAGE:
            return {
            ...state,
            activePage: payload,
            };
        case SET_ROWS_AMOUNT_PER_PAGE:
            return {
            ...state,
            rowsPerPage: payload,
            };
        case SET_TOTAL_EMAILS_COUNT:
            return {
            ...state,
            totalEmails: payload,
            };

      default:
        return state;
    }
  };

  export default emailReducer;
