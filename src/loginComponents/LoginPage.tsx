import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
  
    const goToProfilePage = () => {
        navigate('/profile-page');
    };

    const goToRegisterPage = () => {
        navigate("/register")
    }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });
  };

  return (
    <div className="novaLoginUniverse">
      <div className="novaLoginCard">
        <div className="novaLoginHeader">
          <h1>Welcome Back</h1>

          <p>
            Sign in to continue to your account
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="novaLoginForm"
        >
          <div className="novaInputGalaxy">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="novaInputGalaxy">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="novaLoginButton"
            onClick={goToProfilePage}
          >
            Login
          </button>
        </form>

        <div className="novaLoginFooter">
          <span>
            Don't have an account?
          </span>

          <button type="button" onClick={goToRegisterPage}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage