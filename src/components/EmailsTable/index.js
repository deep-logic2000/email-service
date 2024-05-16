import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { useSelector, useDispatch } from "react-redux";
import {
  setActiveTablePage,
  setRowsAmountPerPage,
  getAllEmails,
} from "../../store/actionCreators/emailsAC";

function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        <LastPageIcon />
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function EmailsTable() {

  const { emails } = useSelector((state) => state.emails);
  const { activePage } = useSelector((state) => state.emails);
  const { rowsPerPage } = useSelector((state) => state.emails);
  const { totalEmails } = useSelector((state) => state.emails);

  const dispatch = useDispatch();

  const emptyRows =
    activePage > 0
      ? Math.max(0, (1 + activePage) * rowsPerPage - totalEmails)
      : 0;

  const handleChangePage = (event, newPage) => {
    dispatch(setActiveTablePage(newPage));
    dispatch(getAllEmails());
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsAmountPerPage(parseInt(event.target.value, 10)));
    dispatch(setActiveTablePage(0));
    dispatch(getAllEmails());
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell style={{ width: 50 }}>Id</TableCell>
            <TableCell align="left" style={{ width: 200 }}>Recipient</TableCell>
            <TableCell align="left" style={{ width: 300 }}>Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsPerPage > 0 &&
            emails.map((email) => (
              <TableRow key={email.id}>
                <TableCell component="th" scope="row" align="left">
                  {email.id}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {email.recipient}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {email.subject}
                </TableCell>
              </TableRow>
            ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={totalEmails}
              rowsPerPage={rowsPerPage}
              page={activePage}
              slotProps={{
                select: {
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
