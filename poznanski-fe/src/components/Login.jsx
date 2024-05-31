import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useTheme } from "../hooks/ThemeContext";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const [errorMessage, setErrorMessage] = useState("");
  const { signUpWithGmail, login } = useContext(AuthContext);
  const { isDarkMode } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        const user = result.user;

        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
      }
      axiosPublic.post('https://poznanski.onrender.com/users', userInfo)
      .then(res =>{
          console.log(res.data);
          navigate('/');
      })

        alert("Login successful!");
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Please provide valid email & password!");
      });
      reset()

  };

  // login with google
  const handleRegister = () => {
    signUpWithGmail().then(result =>{
      console.log(result.user);
      const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName
      }
      axiosPublic.post('https://poznanski.onrender.com/users', userInfo)
      .then(res =>{
          console.log(res.data);
          alert("Login successful!");
        
      })
      navigate('/');
  })
  };
  return (
    <div className={`max-w-md ${isDarkMode ? "bg-black" : "bg-white"} shadow w-full mx-auto flex items-center justify-center my-20`}>
    <div className="mb-5">
    <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-black"}`}>Please Login!</h3>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className={`label-text ${isDarkMode ? "text-white" : "text-black"}`}>Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className={`input input-bordered ${isDarkMode ? "text-white" : "text-black"}`}
                {...register("email")}
              />
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className={`label-text ${isDarkMode ? "text-white" : "text-black"}`}>Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className={`input input-bordered ${isDarkMode ? "text-white" : "text-black"}`}
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className={`label-text-alt link link-hover mt-2 ${isDarkMode ? "text-white" : "text-black"}`}>
                  Forgot password?
                </a>
              </label>
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-#f87171 text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="bg-red mt-9 font-semibold btn text-white px-8 py-3 rounded-full"
                value="Login"
              />
            </div>

    

            <p className={`text-center my-2 ${isDarkMode ? "text-white" : "text-black"}`}>
              Don't have an account?
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>
            </p>
          </form>
    <div className="text-center space-x-3">
        <button onClick={handleRegister} className="btn btn-circle hover:bg-red hover:text-white">
          <FaGoogle />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Login;
