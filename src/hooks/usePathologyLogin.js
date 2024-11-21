import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const usePathologyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/pathologylogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success(`logged in successfully`);
        naviagte("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};

export default usePathologyLogin;
