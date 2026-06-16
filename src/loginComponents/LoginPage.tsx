import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface LoginResponse {
  token?: string;
  message?: string;
  user?: User;
  errors?: {
    login?: string[];
    password?: string[];
  };
}

const LoginPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const goToRegisterPage = () => {
    navigate("/register");
  };

  

  const handleLogin = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      console.log({
        login,
        password,
      });

      setLoading(true);
      setError("");
      

      try {
        const response = await fetch(
          "https://ambchapcorps.org/api/auth/login",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              login,
              password,
            }),
          }
        );

        const data: LoginResponse =
          await response.json();

        console.log(data);

        if (!response.ok) {
          const errorMessage =
            data.message ||
            Object.values(data.errors || {})
              .flat()
              .join(", ");

          throw new Error(errorMessage);
        }

        if (data.token) {
          setToken(data.token);

          localStorage.setItem(
            "token",
            data.token
          );
        }

        if (data.user) {
          localStorage.setItem(
            "user",
            JSON.stringify(data.user)
          );
        }

        navigate("/dashboard-page");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(
            "Something went wrong"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="novaLoginUniverse">
      <div className="novaLoginCard">

        <div className="novaLoginHeader">
          <h1>Welcome Back</h1>

          <p>
            Sign in to continue to
            your account
          </p>
        </div>

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}

        <form
          onSubmit={handleLogin}
          className="novaLoginForm"
        >
          <div className="novaInputGalaxy">
            <label>
              Email or Membership ID
            </label>

            <input
              type="text"
              placeholder="Enter email or membership ID"
              value={login}
              onChange={(e) =>
                setLogin(
                  e.target.value
                )
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
                setPassword(
                  e.target.value
                )
              }
            />
          </div>

          <button
            type="submit"
            className="novaLoginButton"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div className="novaLoginFooter">
          <span>
            Don't have an account?
          </span>

          <button
            type="button"
            onClick={
              goToRegisterPage
            }
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;