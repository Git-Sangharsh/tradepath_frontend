import AuthAsset from "../../assets/signup.mp4";
import "../signup/signup.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const SignupRoute = () => {
    navigate("/auth/signup");
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-box">
          <h1 className="auth-title font-var-2">Login</h1>
          <p className="auth-p font-var-2">Welcome back! Please sign in to continue.</p>
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
          <h6 className="auth-link font-var-2" onClick={SignupRoute}>Sign up and get started today!</h6>
        </div>

        {/* Heading just below auth box */}

        <div className="video-wrapper">
          <video src={AuthAsset} autoPlay muted loop playsInline />
        </div>
      </div>
    </div>
  );
};

export default Login;
