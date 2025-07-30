import AuthAsset from "../../assets/signup.mp4";
import "../signup/signup.css";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

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
    setError(null);

    // Check if email ends with @gmail.com
    if (!email || !email.endsWith("@gmail.com")) {
      setError("Email must be a valid @gmail.com address");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

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
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper"   onKeyDown={(e) => {
    if (e.key === "Enter") submitBtn();
  }}>
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
          <button className="auth-btn font-var-2" onClick={submitBtn} >
            Login
          </button>
          <h6 className="auth-link font-var-2" onClick={SignupRoute}>
            Sign up and get started today!
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

export default Login;
