import "./signup.css";
import AuthAsset from "../../assets/signup.mp4";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const LoginRoute = () => {
    navigate("/auth/login");
  };

const submitBtn = async () => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/signup`,
      {
        fullName,
        email,
        password,
      }
    );

    console.log("Signup success:", res.data);

    // If backend returns a token after signup
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    // Navigate to home or dashboard
    navigate("/");
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    alert("Signup failed. Please check your details.");
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
          <h1 className="auth-title font-var-2">Sign Up</h1>
          <p className="auth-p font-var-2">
            Please sign up and explore all the features we have to offer.
          </p>
          <input
            type="text"
            placeholder="Full Name"
            className="auth-input font-var-2"
            onChange={handleFullName}
          />
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
            Sign Up
          </button>
          <h6 className="auth-link font-var-2" onClick={LoginRoute}>
            Already have an Account? Login Now!
          </h6>
        </motion.div>

        <div className="video-wrapper">
          <video src={AuthAsset} autoPlay muted loop playsInline />
        </div>
      </div>
    </div>
  );
};

export default Signup;
