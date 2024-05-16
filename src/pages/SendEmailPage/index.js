import React, { useState } from "react";

import { Box, TextField, Typography, Button } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { sendEmail } from "../../store/actionCreators/emailsAC";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function SendEmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { currentUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSendEmail = () => {
    const emailData = {
      sender: currentUser.id,
      recipient,
      subject,
      message: editorState.getCurrentContent().getPlainText(),
    };
    new Promise((resolve, reject) => {
      dispatch(sendEmail(emailData, resolve));
    }).then(() => {
      navigate("/emails");
    });

    // dispatch(sendEmail(emailData));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "60vh",
      }}>
      <Box width="90%">
        <Box
          noValidate
          autoComplete="off"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mt={1}>
          <Typography>From:</Typography>
          <Box width="90%">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Typography align="left">
                &quot;{currentUser.username}&quot; &lt; ${currentUser.email}
                &gt;
              </Typography>
              <Button
                variant="contained"
                onClick={handleSendEmail}
                color="success">
                Send
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          noValidate
          autoComplete="off"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mt={1}>
          <Typography variant="p">Recipient</Typography>
          <Box width="90%">
            <TextField
              id="outlined-controlled"
              value={recipient}
              onChange={(event) => {
                setRecipient(event.target.value);
              }}
              fullWidth
              size="small"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mt={1}>
          <Typography variant="p">Subject</Typography>
          <Box width="90%">
            <TextField
              id="outlined-controlled"
              value={subject}
              onChange={(event) => {
                setSubject(event.target.value);
              }}
              fullWidth
              size="small"
            />
          </Box>
        </Box>
        <Box mt={1} height="100%">
          <Editor
            editorState={editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={handleEditorStateChange}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default SendEmailPage;
