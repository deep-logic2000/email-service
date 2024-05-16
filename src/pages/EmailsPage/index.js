import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllEmails } from "../../store/actionCreators/emailsAC";
import { getCurrentUser } from "../../store/actionCreators/userAC";

import { Container } from "@mui/material";
import EmailsTable from "../../components/EmailsTable";

import "./EmailsPage.scss";

const EmailsPage = () => {
  const emails = useSelector((state) => state.emails.emails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getAllEmails());
  }, [dispatch]);

  return (
    <section className="emails-section">
      <Container className="emails-page__wrapper" maxWidth="lg">
        <h1 className="title">My Emails</h1>
        <EmailsTable emails={emails} />
      </Container>
    </section>
  );
};

export default EmailsPage;
