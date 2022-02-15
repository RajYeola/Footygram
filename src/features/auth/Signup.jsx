import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "./authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import MediaQuery from "react-responsive";
import { Toaster } from "react-hot-toast";
import {
  invalidCredentialsSignupToast,
  invalidEmailToast,
  invalidNameToast,
  invalidPasswordToast,
  invalidUsernameToast,
} from "../../utils/toasts.js";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const { status, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserInfoData = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value.trim() });
  };

  const usernameRegex = /^[a-z0-9_]{3,}$/;
  const usernameTest = usernameRegex.test(userInfo.username);

  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const nameTest = nameRegex.test(userInfo.name);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailTest = emailRegex.test(userInfo.email);

  const passwordRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}/;
  const passwordTest = passwordRegex.test(userInfo.password);

  // console.log("name", nameTest);
  // console.log("username", usernameTest);
  // console.log("email", emailTest);
  // console.log("password", passwordTest);

  useEffect(() => {
    token && navigate("/");
  }, [token, navigate]);

  return (
    <div className="w-4/5 md:w-2/5 mx-auto py-4 md:py-4 flex flex-col items-center">
      <h1 className="text-xl md:text-3xl font-bold mb-4 md:mb-8">
        Sign Up for <span className="font-sofia">Footygram</span>
      </h1>

      <input
        type="text"
        name="name"
        className={`primary-input w-4/5 py-1 md:py-2 px-2 md:px-4 mb-4 md:mb-8 rounded-lg bg-transparent md:text-lg ${
          nameTest ? "primary-input-success" : "primary-input-danger"
        }`}
        placeholder="Name"
        onChange={handleUserInfoData}
        required
      />

      <input
        type="text"
        name="username"
        className={`primary-input w-4/5 py-1 md:py-2 px-2 md:px-4 mb-4 md:mb-8 rounded-lg bg-transparent md:text-lg ${
          usernameTest ? "primary-input-success" : "primary-input-danger"
        }`}
        placeholder="Username"
        onChange={handleUserInfoData}
        required
      />

      <input
        type="email"
        name="email"
        className={`primary-input w-4/5 py-1 md:py-2 px-2 md:px-4 mb-4 md:mb-8 rounded-lg bg-transparent md:text-lg ${
          emailTest ? "primary-input-success" : "primary-input-danger"
        }`}
        placeholder="Email"
        onChange={handleUserInfoData}
        required
      />

      <input
        type={showPassword ? "text" : "password"}
        name="password"
        className={`primary-input w-4/5 py-1 md:py-2 px-2 md:px-4 mb-2 rounded-lg bg-transparent md:text-lg ${
          passwordTest ? "primary-input-success" : "primary-input-danger"
        }`}
        placeholder="Password"
        onChange={handleUserInfoData}
        required
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
          if (!nameTest) {
            invalidNameToast();
          } else if (!usernameTest) {
            invalidUsernameToast();
          } else if (!emailTest) {
            invalidEmailToast();
          } else if (!passwordTest) {
            invalidPasswordToast();
          } else if (status === "error") {
            invalidCredentialsSignupToast();
          } else {
            dispatch(signupUser(userInfo));
          }
        }}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Signing up" : "Sign up"}
      </button>
      <Link to="/login" className="md:text-lg">
        Already have an account?{" "}
        <span className="color-secondary font-bold">Login</span>
      </Link>
      <MediaQuery minWidth={769}>
        <Toaster position="top-right" />
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        <Toaster position="bottom-center" />
      </MediaQuery>
    </div>
  );
};

export default Signup;
