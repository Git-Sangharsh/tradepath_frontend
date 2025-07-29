import AuthAsset from "../../assets/signup.mp4";
import "../signup/signup.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const SignupRoute = () => {
    navigate("/auth/signup");
  };

  const submitBtn = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      // Store the token BEFORE navigating
      localStorage.setItem("token", res.data.token);

      // console.log("Login successful:", res.data);

      // Navigate after login
      navigate("/");
      dispatch({ type: "SET_IS_AUTHENTICATED", payload: true });
    } catch (err) {
      console.error(
        "Error found while logging in:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <motion.div
          className="auth-box"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="auth-title font-var-2">Login</h1>
          <p className="auth-p font-var-2">
            Welcome back! Please sign in to continue.
          </p>
          <input
            type="email"
            placeholder="Email"
            className="auth-input font-var-2"
            onChange={handleEmail}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input font-var-2"
            onChange={handlePassword}
          />
          <button className="auth-btn font-var-2" onClick={submitBtn}>
            Login
          </button>
          <h6 className="auth-link font-var-2" onClick={SignupRoute}>
            Sign up and get started today!
          </h6>
        </motion.div>

        <div className="video-wrapper">
          <video src={AuthAsset} autoPlay muted playsInline />
        </div>
      </div>
    </div>
  );
};

export default Login;
