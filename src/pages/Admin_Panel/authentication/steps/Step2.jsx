import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../../../../Context/GlobalContext";
import { useAuthContext } from "../../../../Context/AuthContext";
import flowChangerLogo from "../../../../Assets/Images/flowchangerAINew.jpeg";

const Step2 = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");

  const { openToast } = useGlobalContext();
  const { nextStep, adminInfo, updateAdminInfo } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Set form values from adminInfo when the component mounts
  useEffect(() => {
    if (
      adminInfo.first_name ||
      adminInfo.last_name ||
      adminInfo.mobile ||
      adminInfo.password
    ) {
      setValue("first_name", adminInfo.first_name);
      setValue("last_name", adminInfo.last_name);
      setValue("mobile", adminInfo.mobile);
      setValue("password", adminInfo.password);
    }
  }, [adminInfo, setValue]);

  const handleInfoSubmission = async (updatedAdminInfo) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAdminInfo),
      });

      console.log(response);

      if (response.status === 201) {
        nextStep();
        setSearchParams({ step: 3, email: email });
      } else {
        const result = await response.json();
        console.log(result.message);
        openToast(result.message || "Internal server error", "error");
      }
    } catch (error) {
      openToast("Error while submitting data:", error);
    }
  };

  const onSubmit = async (data) => {
    const { terms, ...userInfo } = data;
    const updatedAdminInfo = { ...adminInfo, ...userInfo };
    updateAdminInfo(updatedAdminInfo);
    try {
      setIsLoading(true);
      await handleInfoSubmission(updatedAdminInfo);
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo section */}
        <div className="text-white text-4xl font-bold mb-8 flex justify-center">
          <img
            className="h-[150px]"
            src={flowChangerLogo}
            alt="Flowchangers Logo"
          />
        </div>
        <div className="p-4 shadow-4xl border border-gray-300 bg-white rounded-md">
          {/* User Details Form */}
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                placeholder="First Name"
                aria-label="first_name"
                className="w-full px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
                {...register("first_name", {
                  required: "First Name is required",
                })}
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.first_name.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                placeholder="Last Name"
                aria-label="last_name"
                className="w-full px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
                {...register("last_name", {
                  required: "Last Name is required",
                })}
              />
              {errors.last_name && (
                <p className="text-red-500">{errors.last_name.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="mobile">Mobile No.</label>
              <input
                type="number"
                id="mobile"
                placeholder="Mobile No."
                aria-label="mobile"
                className="w-full px-3 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-200"
                {...register("mobile", {
                  required: "Mobile no. is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Mobile number must be exactly 10 digits",
                  },
                })}
              />
              {errors.mobile && (
                <p className="text-red-500">{errors.mobile.message}</p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter a password"
                aria-label="password"
                className="w-full px-3 py-3 rounded-md focus:outline-none bg-gray-200"
                {...register("password", { required: "Create your password" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="checkbox"
                aria-label="checkbox"
                className="w-[30px] py-3 rounded-md focus:outline-none bg-slate-100"
                {...register("terms", {
                  required: "You must agree to the terms",
                })}
              />
              <div className="flex flex-col">
                <label htmlFor="checkbox" className="ml-2">
                  I agree with the Terms and Privacy Policy
                </label>
                {errors.terms && (
                  <p className="text-red-500">{errors.terms.message}</p>
                )}
              </div>
            </div>
            {/* Next step button */}
            <button
              type="submit"
              className={`w-full bg-purple-600 text-white py-4 px-4 hover:bg-purple-500 transition duration-300 rounded-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Step2;
