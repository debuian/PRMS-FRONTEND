import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap"; // Assuming you are using React-Bootstrap

export default function NotFoundPage() {
  const navigate = useNavigate(); // Move this outside the function

  const navigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <div>404 Not Found</div>
      <div>
        <Button onClick={navigateToSignUp}>Sign up</Button>
      </div>
    </>
  );
}
