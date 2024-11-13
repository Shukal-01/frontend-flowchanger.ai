import { useState } from "react";
import { useGlobalContext } from "../../../Context/GlobalContext";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

function LoginStaff() {
  const { baseUrl, openToast } = useGlobalContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();

      const response = await fetch(`${baseUrl}staff-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile: phoneNumber, login_otp: parseInt(otp) }),
      });

      const data = await response.json();
      if (response.status == 200) {
        setOtp("");
        setPhoneNumber("");
        openToast("Login successful!", "success");
        Cookies.set("flowChangerAuthToken", data.token);
        navigate("/chats/staff");
      } else {
        openToast(data.message, "error");
      }
    } catch (error) {
      openToast("Login failed!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-[350px]">
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold">Staff Login</h2>
          <p>Enter your mobile number and the OTP to log in.</p>
        </div>
        <div className="px-6 py-4">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Mobile Number
              </label>
              <input
                id="phone"
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter your mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="otp" className="block text-sm font-medium">
                One-Time Password
              </label>
              <input
                id="otp"
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter the 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-500 ${
                loading && "opacity-50"
              } text-white py-2 rounded-lg`}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginStaff;
