import "../styles/sharedLogin.css";
import { Paper, Text, TextInput, Button } from "@mantine/core";
import usePathologyLogin from "../hooks/usePathologyLogin";
import { useNavigate } from "react-router-dom";

const PathologyLogin = () => {
  const { email, setEmail, password, setPassword, handleSubmit } =
    usePathologyLogin();
  const navigate = useNavigate();

  return (
    <>
      <Paper className="login-container" padding="xl" radius="md" withBorder>
        <Text size="lg" fw={500} align="center" mb="md">
          Welcome to PRMS <br />
          Pathology Login
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
              Don't have an account?
              <a
                onClick={() => navigate("/pathology-signup")}
                style={{ marginLeft: "9px" }}
              >
                Register
              </a>
            </Text>
            <Button
              type="submit"
              radius="md"
              className="login-button"
              style={{ marginLeft: "9px" }}
            >
              Login
            </Button>
          </div>
        </form>
      </Paper>
    </>
  );
};

export default PathologyLogin;
