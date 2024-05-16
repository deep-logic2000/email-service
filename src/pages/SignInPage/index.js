import React, { useState, useEffect, useCallback } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useSelector } from "react-redux";
import { useAuth } from "../../components/AuthProvider/AuthProvider";

export default function SignInPage() {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.users);
  const { login } = useAuth();

  const [values, setValues] = useState({
    username: "7_test_fron",
    password: "vikXrEjU",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const dispatch = useDispatch();

  const isDirty = !!errors.username || !!errors.password;

  const handleChange = (name, value) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validateName = useCallback((value) => {
    if (/\W/.test(value)) {
      setErrors((current) => ({ ...current, username: "Only latin letters" }));
    } else if (value.length < 3) {
      setErrors((current) => ({
        ...current,
        username: "Name should be more than 3 symbols",
      }));
    } else {
      setErrors((current) => ({ ...current, username: "" }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signInData = {
      username: values.username,
      password: values.password,
    };

    new Promise((resolve, reject) => {
      dispatch(login(signInData, resolve));
    }).then(() => {
      navigate("/emails");
    });
  };

  useEffect(() => {
    if (touched.username) {
      validateName(values.username);
    }
  }, [values.username, touched.username, validateName]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/emails");
    } else {
      navigate("/signin");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={values.username}
            onChange={({ target }) => {
              handleChange(target.name, target.value);
              if (touched.username) {
                validateName(target.value);
              }
            }}
            onBlur={({ target }) => {
              if (!touched.username) {
                setTouched((current) => ({ ...current, username: true }));
                validateName(target.value);
              }
            }}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={({ target }) => {
              handleChange(target.name, target.value);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isDirty}>
            Login
          </Button>
        </Box>
        <Typography>
          OR
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate("/signup")}>
          Create account
        </Button>
      </Box>
    </Container>
  );
}
