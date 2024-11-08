import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuthContext } from "../../../../Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import flowChangerLogo from "../../../../Assets/Images/flowchangerAINew.jpeg";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useGlobalContext } from "../../../../Context/GlobalContext";
//

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const { openToast, baseUrl } = useGlobalContext();
  const navigate = useNavigate();

  console.log(isAuthenticated);

  const handleLoggedIn = async (loginInfo) => {
    console.log(loginInfo);
    try {
      const response = await fetch(baseUrl + "admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      console.log(response);
      const result = await response.json();
      const { token } = result;
      if (response.status === 200 && token) {
        openToast("You have successfully logged in", "success");
        console.log("You have logged in");
        Cookies.set("flowChangerAuthToken", token);
        return true;
      } else {
        console.log("there is no token");
        openToast(result.message || "Login failed", "error");
        console.log("can't logged in");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      openToast("An error occurred. Please try again.", "error");
      return false;
    }
  };

  const handleGoogleLogin = () => {
    try {
      loginWithRedirect();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const success = await handleLoggedIn(data);
      if (success) {
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <GoogleOAuthProvider>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-white text-4xl font-bold mb-8 flex justify-center">
            <img
              src={flowChangerLogo}
              alt="Flowchangers Logo"
              className="bg-black w-[350px] h-[200px]"
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Log in</h2>
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center mb-4 hover:bg-gray-50 transition duration-300"
            >
              Login With Google
            </button>
            <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <div className="text-center text-gray-500 px-4 py-2 border-gray-300">
                or Log in with Email
              </div>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  className="w-full px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
                  {...register("email", { required: "email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  className="w-full px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-4 px-4 hover:bg-purple-500 transition duration-300 rounded-full"
              >
                Log in
              </button>
            </form>
            <div className="text-center mt-4 flex flex-col justify-center gap-y-3">
              <a href="#" className="text-purple-600 hover:text-purple-500">
                <span className="text-gray-400">Forgot password?</span>
                <Link to="/authentication/request-password">Reset</Link>
              </a>
              <a href="#" className="text-purple-600 hover:text-purple-500">
                <span className="text-gray-400">Don't have an account?</span>
                <Link to="/authentication?step=1">Sign up</Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
