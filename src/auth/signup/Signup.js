import "./signup.css";
import AuthAsset from "../../assets/signup.mp4";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

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
    setError(null);

    // Basic client-side checks
    if (!fullName || !email || !password) {
      setError("All fields are required");
      setTimeout(() => setError(null), 5000);
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      setError("Email must be a valid @gmail.com address");
      setTimeout(() => setError(null), 5000);
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        { fullName, email, password }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      navigate("/");
    } catch (error) {
      const msg = error.response?.data?.message || "Signup failed";
      setError(msg);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="auth-container">
      <div
        className="auth-wrapper"
        onKeyDown={(e) => {
          if (e.key === "Enter") submitBtn();
        }}
      >
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
          <AnimatePresence>
            {error && (
              <motion.h6
                className="auth-error font-var"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.h6>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="video-wrapper">
          <video src={AuthAsset} autoPlay muted playsInline />
        </div>
      </div>
    </div>
  );
};

export default Signup;
