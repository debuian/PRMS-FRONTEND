import React, { useState } from "react";
import { Paper, Text, TextInput, Button } from "@mantine/core";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import fetchPharmacySignUpAPI from "../containers/fetchPharmacySignUpAPI";

const PharmacySingup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    try {
      const result = await fetchPharmacySignUpAPI(payload);
      console.log(result);

      if (result.success) {
        toast.success(result.data.message);
        navigate("/pharmacy-login");
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Paper className="login-container" padding="xl" radius="md" withBorder>
        <Text size="lg" fw={500} align="center" mb="md">
          Welcome to PRMS <br /> Pharmacy SignUp
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
              <a
                onClick={() => navigate("/pharmacy-login")}
                style={{ marginLeft: "9px" }}
              >
                Login
              </a>
            </Text>
            <Button
              type="submit"
              radius="md"
              className="login-button"
              style={{ marginLeft: "9px" }}
            >
              Register
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default PharmacySingup;
