import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signinUser } from "./authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { invalidCredentialsToast } from "../../utils/toasts.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, token } = useSelector((state) => state.auth);

  const handleUserInfoData = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);

  return (
    <div className="w-4/5 md:w-2/5 mx-auto py-12 md:py-20 flex flex-col items-center">
      <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8">
        Login to <span className="font-sofia">Footygram</span>
      </h1>
      <input
        type="text"
        name="username"
        className="primary-input w-4/5 py-1 md:py-2 px-2 md:px-4 mb-4 md:mb-8 rounded-lg bg-transparent md:text-lg"
        placeholder="Username"
        onChange={handleUserInfoData}
        value={userInfo.username}
      />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        className="primary-input w-4/5 py-1 md:py-2 px-2 md:px-4 mb-2 rounded-lg bg-transparent md:text-lg"
        placeholder="Password"
        onChange={handleUserInfoData}
        value={userInfo.password}
      />
      <label>
        <input
          className="pt-2 mb-4 md:mb-8"
          type="checkbox"
          onChange={() => setShowPassword((prev) => !prev)}
        />
        <span className="pl-2 md:text-lg">Show Password</span>
      </label>
      <button
        className={`w-4/5 py-1 md:py-2 px-2 md:px-4 rounded-lg tracking-wider uppercase font-bold btn mb-4 ${
          status === "loading" && "cursor-not-allowed"
        }`}
        style={{
          color: "var(--primary-background-color)",
        }}
        onClick={() => {
          if (status === "error") {
            invalidCredentialsToast();
          } else {
            dispatch(signinUser(userInfo));
          }
        }}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Logging In" : "Login"}
      </button>
      <Link to="/signup" className="md:text-lg md:py-1">
        Don't have an account?{" "}
        <span className="color-secondary font-bold">Sign Up</span>
      </Link>
      <p className="text-center md:text-lg md:py-1">
        Or you can login{" "}
        <button
          className="text-center color-secondary font-bold"
          onClick={() =>
            setUserInfo({ username: "tester", password: "Tester@123" })
          }
        >
          Using Test Credentials
        </button>
      </p>
      {status === "error" && <Toaster position="top-center" />}
    </div>
  );
};

export default Login;
