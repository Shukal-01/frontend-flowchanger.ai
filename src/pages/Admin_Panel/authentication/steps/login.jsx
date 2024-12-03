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
import EmailIcon from '@mui/icons-material/Email';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { openToast, baseUrl } = useGlobalContext();
  const navigate = useNavigate();

  const handleLoggedIn = async (loginInfo) => {
    console.log(loginInfo);
    try {
      const response = await fetch(
        "https://fc-production-testing.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );
      console.log(response);
      const result = await response.json();
      const { token } = result;
      if (response.status === 200) {
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
      const LoginInfo = {
        email: data.email.toLowerCase(),
        password: data.password,
      };
      const success = await handleLoggedIn(LoginInfo);
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
      <div className="flex h-lvh justify-center items-center py-[10px] px-[10px] xl:py-[20px] xl:px-[20px]  lg:py-[20px] lg:px-[20px]  md:py-[20px] md:px-[20px]">
        <div className="login-div w-[100%] xl:w-[80%] flex justify-center  bg-white rounded-lg items-center p-3 xl:p-8 lg:p-8 md:p-8 ">
          <div className="w-[100%] lg:w-[82] xl:w-[50%]">
            <div className="xl:px-[30px] lg:px-[62px] sm:space-y-0 space-y-2">
              <div className="">
                <h2 className="text-[30px] text-[#8a25b1] font-semibold	  text-center">Log in</h2>
                <p className="text-center text-[#8c8c8c] pb-2">Log in to Your Account</p>

              </div>
              <div className="flex items-center justify-center my-4">
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 sm:space-y-0 mt-4 sm:mt-0">
                <div className="mb-4 relative">
                  <input
                    type="email"
                    placeholder="Email"
                    aria-label="Email"
                    className="login-input-field "
                    {...register("email", { required: "email is required" })}
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                  <EmailIcon className="email-icon absolute right-[5px] top-[7px] text-[#8a25b1]" />
                </div>
                <div className=" relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    aria-label="Password"
                    className="login-input-field"
                    {...register("password", {
                      required: "password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[3px]  "
                  >
                    {showPassword ? (
                      <VisibilityIcon className="email-icon absolute right-[5px] top-[7px] text-[#8a25b1]" />
                    ) : (
                      <VisibilityOffIcon className="email-icon absolute right-[5px] top-[7px] text-[#8a25b1]" />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center py-2">
                  <Link to="/authentication/request-password" className="text-gray-400 mr-2">Forgot password?</Link>
                  <Link to="#" className="text-gray-400 mr-2 transition-all hover:text-[#8a25b1]">Reset</Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${isLoading ? "bg-[#8a25b1]" : "bg-[#8a25b1]"
                    } text-white py-4 px-4 hover:bg-purple-500 transition duration-300 rounded-full`}
                >
                  Log in
                </button>
              </form>
              <div className="text-center mt-4 xl:flex lg:flex  flex-col justify-center 2xl:gap-[10px] gap-y-3">
                <p className="text-gray-400">Don't have an account ?   </p>
                <Link to="/authentication?step=1" className="text-[#8a25b1] font-medium" >Sign up</Link>

              </div>
            </div>
          </div>
          <div className="w-[50%] px-[30px] text-4xl text-center hidden xl:block lg:block">
            {/* <img src={flowChangerLogo} className="w-[230px] h-[230px]" /> */}
            <h2>WELCOME</h2>
            <h2>TO <span className="text-[#8a25b1] font-bold">FLOWCHANGER AI</span></h2>
            <p className="text-sm font-semibold font-sans			">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae nihil temporibus blanditiis dolorum, rem quidem nulla excepturi magni quod eveniet libero alias modi atque totam possimus vitae.</p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
