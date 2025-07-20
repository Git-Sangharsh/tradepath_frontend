import AuthAsset from "../../assets/signup.mp4";
import "../signup/signup.css";

const Login = () => {
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
        </div>

        <div className="video-wrapper">
          <video src={AuthAsset} autoPlay muted loop playsInline />
        </div>
      </div>
    </div>
  );
};

export default Login;
