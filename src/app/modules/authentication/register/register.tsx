import React, { use } from "react";
import { useNavigate } from "react-router";
import { authenticationRoutePath } from "../authentication.routes";

const Register: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Register Page</h2>
      <button onClick={() => navigate(authenticationRoutePath.LOGIN)}>
        Login
      </button>
    </div>
  );
};

export default Register;
