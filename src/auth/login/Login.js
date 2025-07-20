import AuthAsset from "../../assets/signup.mp4";
import "../signup/signup.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Login = () => {
  const navigate = useNavigate();
  const SignupRoute = () => {
    navigate("/auth/signup");
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
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input font-var-2"
          />
          <button className="auth-btn font-var-2">Login</button>
          <h6 className="auth-link font-var-2" onClick={SignupRoute}>
            Sign up and get started today!
          </h6>
        </motion.div>
        {/* Heading just below auth box */}

        <div className="video-wrapper">
          <video src={AuthAsset} autoPlay muted loop playsInline />
        </div>
      </div>
    </div>
  );
};

export default Login;
