import React, { useState } from "react";
import { useGlobalContext } from "../../../../Context/GlobalContext";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../../../Context/AuthContext";
import flowChangerLogo from "../../../../Assets/Images/flowchangerAINew.jpeg";

const Step3 = () => {
  const navigate = useNavigate();
  const { baseUrl, openToast } = useGlobalContext();
  const { nextStep, adminInfo, handleInfoSubmission } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");

  console.log(adminInfo);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(index + 1).focus();
    }
  };
  const submitOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl + "admin/verify-otp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: code.join(""), email: adminInfo.email }),
      });

      if (response.status === 200) {
        setIsLoading(false);
        openToast("OTP verified successfully!", "success");
        nextStep();
        setSearchParams({ step: 4, email: email });
      } else {
        const result = await response.json();
        openToast(result.message || "OTP verification failed.", "error");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      openToast("An error occurred. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // code to resend OTP
  const ResendOTP = async (updatedAdminInfo) => {
    try {
      const response = await fetch(
        "https://fc-prod-test.onrender.com/api/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAdminInfo),
        }
      );

      console.log(response);

      if (response.status === 201) {
        nextStep();
        setSearchParams({ step: 4, email: email });
      } else {
        const result = await response.json();
        console.log(result.message);
        openToast(result.message || "Internal server error", "error");
      }
    } catch (error) {
      openToast("Error while submitting data:", error);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className="text-white text-4xl font-bold mb-8 flex justify-center">
        <img
          className="h-[150px]"
          src={flowChangerLogo}
          alt="Flowchangers Logo"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify your Email
        </h2>
        <p className="text-gray-600 text-center mb-2">
          We sent a confirmation code on
        </p>
        <p className="text-center font-semibold mb-6">{adminInfo.email}</p>

        <div className="flex justify-center space-x-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
            />
          ))}
        </div>

        <p className="text-gray-600 text-center mb-6">
          Enter a 6-digit confirmation code below
        </p>

        <button
          onClick={submitOtp}
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-full transition duration-300 mb-4 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 text-white hover:bg-purple-500"
          }`}
        >
          Verify
        </button>

        <p className="text-center text-sm">
          Didn't receive a code?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={ResendOTP}
          >
            Send it again
          </a>
        </p>
      </div>
    </div>
  );
};

export default Step3;
