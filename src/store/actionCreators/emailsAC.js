import {
  GET_ALL_EMAILS,
  NEW_ERROR,
  SET_ACTIVE_TABLE_PAGE,
  SET_ROWS_AMOUNT_PER_PAGE,
  SET_TOTAL_EMAILS_COUNT,
} from "../actions/emailsActions";
import { getAllEmailsApi, sendEmailApi } from "../../api/api";
import { openErrorSnackBar, openSuccessSnackBar } from "./snackBarAC";

export const addNewError = (data) => ({ type: NEW_ERROR, payload: data });

export const getAllEmails = () => async (dispatch, getState) => {
  const state = getState();
  const limit = state.emails.rowsPerPage;
  const offset = limit * state.emails.activePage || 0;

  await getAllEmailsApi(offset, limit)
    .then((rsp) => {
      if (rsp.status === 200 || rsp.status === 201) {
        dispatch({ type: GET_ALL_EMAILS, payload: rsp.data });
      }
    })
    .catch((err) => {
      dispatch(openErrorSnackBar(err.response.data.message));
    });
};

export const setActiveTablePage = (page) => ({
  type: SET_ACTIVE_TABLE_PAGE,
  payload: page,
});
export const setRowsAmountPerPage = (rows) => ({
  type: SET_ROWS_AMOUNT_PER_PAGE,
  payload: rows,
});
export const setTotalEmailsCount = (totalEmails) => ({
  type: SET_TOTAL_EMAILS_COUNT,
  payload: totalEmails,
});

export const sendEmail = (emailData, resolve) => async (dispatch) => {
  try {
    await sendEmailApi(emailData);
    dispatch(openSuccessSnackBar("Email sent successfully"));
    resolve();
    dispatch(getAllEmails());
  } catch (error) {
    if (error.response.data?.message?.length > 0) {
      dispatch(openErrorSnackBar("Message: " + error.response.data.message[0]));
    }
    if (error.response.data?.recipient?.length > 0) {
      dispatch(
        openErrorSnackBar("Recipient: " + error.response.data.recipient[0])
      );
    }
    if (error.response.data?.subject?.length > 0) {
      dispatch(openErrorSnackBar("Subject: " + error.response.data.subject[0]));
    }
  }
};
