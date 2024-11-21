import React from "react";
import "../styles/sharedLogin.css";
import { Paper, Text, TextInput, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import usePathologySignUp from "../hooks/usePathologySignUp";

const PathologySignup = () => {
  const { email, setEmail, password, setPassword, handleSubmit } =
    usePathologySignUp();
  const navigate = useNavigate();
  return (
    <Paper className="login-container" padding="xl" radius="md" withBorder>
      <Text size="lg" fw={500} align="center" mb="md">
        Welcome to PRMS
      </Text>
      <form onSubmit={handleSubmit} className="login-form">
        <TextInput
          label="Email:"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          radius="md"
          required
        />
        <TextInput
          label="Password:"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          radius="md"
          required
          type="password"
        />
        <div className="login-actions">
          <Text size="sm" className="register-link">
            Already have an account?
            <a onClick={() => navigate("/pathology-login")}>Login</a>
          </Text>
          <Button type="submit" radius="md" className="login-button">
            Sign Up
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default PathologySignup;
