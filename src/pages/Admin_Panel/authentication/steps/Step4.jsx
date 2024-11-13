import React, { useState } from 'react';
import { useAuthContext } from '../../../../Context/AuthContext';
import { useSearchParams } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import flowChangerLogo from "../../../../Assets/Images/flowchangerAI.jpg"

const Step4 = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const { nextStep, extraInfo,updateExtraInfo} = useAuthContext();
  console.log(extraInfo);
  const [profileImage, setProfileImage] = useState(null); 
  const [isImageUploaded , setIsImageUploaded] = useState(false);
  const email = searchParams.get('email');

  // Handle image change
  const onChange = (imageList) => {
    if (imageList.length > 0) {
      setProfileImage(imageList[0].data_url);
      setIsImageUploaded(true);
      updateExtraInfo({ profile_image: imageList[0].data_url });
    }
  };

  // Handle moving to the next step
  const handleNextStep = () => {
    if (isImageUploaded) { 
      nextStep();
      setSearchParams({ step: 5, email: email });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative ">
      <div className="w-full max-w-md">
        {/* Logo container */}
        <div className="text-white text-4xl font-bold mb-8 flex justify-center">
          <img src={flowChangerLogo} alt="Flowchanger Logo" className="h-[150px]" />
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-300 shadow-4xl">
          <div className="flex flex-col justify-center items-center gap-y-0">
            <h2 className="text-3xl font-medium mb-3 text-center mt-5">Upload Your Profile Picture</h2>
          </div>
          
          {/* Image Preview */}
          <div className="flex items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                className="h-[80px] w-[80px] object-cover rounded-full mb-4"
              />
            ) : (
              <div className="flex items-center justify-center h-[80px] w-[80px] bg-gray-200 rounded-full mb-4">
                <h1 className="left-5 text-3xl text-black font-medium">k</h1>
              </div>
            )}
          </div>

          {/* Image Upload Button */}
          <ImageUploading
            multiple={false}
            onChange={onChange}
            dataURLKey="data_url"
          >
            {({ onImageUpload, dragProps }) => (
              <div className="flex justify-center items-center">
            {isImageUploaded ? (
                  <button
                    onClick={handleNextStep}
                    className="w-[80%] bg-purple-600 text-white py-3 px-4 hover:bg-purple-500 transition duration-300 rounded-full"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={onImageUpload}
                    className="w-[80%] bg-purple-600 text-white py-3 px-4 hover:bg-purple-500 transition duration-300 rounded-full"
                    {...dragProps}
                  >
                    Choose Image
                  </button>
                )}
              </div>
            )}
          </ImageUploading>

          <div className="mt-4 text-center">
            <div className="flex justify-center items-center">
              <button onClick={nextStep} className="text-purple-500 hover:underline">
                skip the step
              </button>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;