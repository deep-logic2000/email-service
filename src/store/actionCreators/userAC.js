import {
  SET_LOG_IN,
  SET_LOG_OUT,
  SET_CURRENT_USER,
} from "../actions/userActions";
import { getCurrentUserApi, createUserApi } from "../../api/api";

import { openErrorSnackBar } from "./snackBarAC";
import { getAllEmails } from "./emailsAC";
import { NEW_ERROR } from "../actions/emailsActions";

export const setLoggedIn = () => ({ type: SET_LOG_IN, payload: true });
export const setLoggedOut = () => ({ type: SET_LOG_OUT, payload: false });

export const addNewError = (data) => ({ type: NEW_ERROR, payload: data });

export const getCurrentUser = () => async (dispatch) => {
  await getCurrentUserApi()
    .then((rsp) => {
      if (rsp.status === 200 || rsp.status === 201) {
        dispatch({ type: SET_CURRENT_USER, payload: rsp.data });
      }
    })
    .catch((err) => {
      dispatch(
        openErrorSnackBar("Recipient: " + err.response.data)
      );
    });
};
export const handleLogIn = (credentials, resolve) => async (dispatch) => {
  if (
    credentials.username === "7_test_fron" &&
    credentials.password === "vikXrEjU"
  ) {
    localStorage.setItem("isLoggedInEmailService", "true");
    resolve();
    dispatch(setLoggedIn());
    dispatch(getCurrentUser());
  } else {
    dispatch(setLoggedOut());
  }
};

export const createUser = (userData, resolve) => async (dispatch) => {
  await createUserApi(userData)
    .then((rsp) => {
      if (rsp.status === 200 || rsp.status === 201) {
        dispatch(getCurrentUser());
        dispatch(getAllEmails())
        resolve();
      }
    })
    .catch((err) => {
      dispatch(addNewError(err));
    });
};
