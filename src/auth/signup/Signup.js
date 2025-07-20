import "./signup.css";
import AuthAsset from "../../assets/signup.mp4";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();

  const LoginRoute = () => {
    navigate("/auth/login");
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
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input font-var-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input font-var-2"
          />
          <button className="auth-btn font-var-2">Sign Up</button>
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
