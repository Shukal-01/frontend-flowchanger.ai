import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../../../Context/AuthContext";
import ImageUploading from "react-images-uploading";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import flowChangerLogo from "../../../../Assets/Images/flowchangerAINew.jpeg";
import { useGlobalContext } from "../../../../Context/GlobalContext";

const Step7 = () => {
  const { baseUrl } = useGlobalContext();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const { extraInfo, updateExtraInfo, setIsAuthenticated } = useAuthContext();
  const [companyLogo, setCompanyLogo] = useState(null);

  useEffect(() => {
    if (email) {
      updateExtraInfo({ email });
    }
  }, [email]);

  const handleExtraInfo = () => {
    updateAdmin();
  };

  // Post request function
  async function updateAdmin() {
    console.log("Submitting info to backend:", extraInfo);
    const infoData = new FormData();
    console.log(infoData);
    for (const key in extraInfo) {
      infoData.append(key, extraInfo[key]);
    }
    try {
      const response = await fetch(baseUrl + "admin/update", {
        method: "PUT",
        body: infoData,
      });
      if (response.status === 200) {
        const result = await response.json();
        const { token } = result;
        if (token) {
          Cookies.set("flowChangerAuthToken", token);
          console.log("Token stored in cookies:", token);
          setIsAuthenticated(true);
        }
        navigate("/");
      } else {
        console.log("Error while submitting data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Handle image change
  const onChange = (imageList) => {
    if (imageList.length > 0) {
      setCompanyLogo(imageList[0].data_url);
      handleNextStep(imageList[0].data_url);
    }
  };

  const handleNextStep = (image) => {
    if (image) {
      updateExtraInfo({ company_logo: image });
      console.log("Profile image saved in context:", image);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        <div className="text-white text-4xl font-bold mb-8 flex justify-center">
          <img
            src={flowChangerLogo}
            alt="Flowchanger Logo"
            className="h-[150px]"
          />
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-300 shadow-2xl">
          <div className="flex flex-col justify-center items-center gap-y-0">
            <h2 className="text-3xl font-medium mb-3 text-center mt-5">
              Upload Your Company Logo
            </h2>
          </div>

          <div className="flex items-center justify-center">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt="Profile Preview"
                className="h-[80px] w-[80px] object-cover rounded-full mb-4"
              />
            ) : (
              <div className="flex items-center justify-center h-[80px] w-[80px] bg-gray-200 rounded-full mb-4">
                <h1 className="left-5 text-3xl text-black font-medium">K</h1>
              </div>
            )}
          </div>

          <ImageUploading
            multiple={false}
            onChange={onChange}
            dataURLKey="data_url"
          >
            {({ onImageUpload, dragProps }) => (
              <div className="flex justify-center items-center">
                <button
                  onClick={onImageUpload}
                  className="w-[80%] bg-purple-600 text-white py-3 px-4 hover:bg-purple-500 transition duration-300 rounded-full"
                  {...dragProps}
                >
                  Choose Image
                </button>
              </div>
            )}
          </ImageUploading>

          <div className="mt-4 text-center">
            <div className="flex justify-center items-center">
              <button
                onClick={handleExtraInfo}
                className="text-purple-500 hover:underline"
              >
                Skip the step
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step7;
