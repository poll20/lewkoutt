import { useState } from "react";

const MyLogin = () => {
  const [phone, setPhone] = useState("");
  
  // Validate phone number
  const isValidPhone = phone.length === 10;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4" style={{marginTop:"44px"}}>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-4">
          <button className="text-sm text-green-600 font-semibold">My/Register</button>
          <button className="text-sm text-gray-500">Skip</button>
        </div> */}

        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-600 text-center">
          FRESHEST <span className="text-black">Fashion</span> FASTEST
        </h1>

        {/* Input Section */}
        <p className="text-gray-600 mt-4 text-center">What’s your mobile number?</p>
        <p className="text-sm text-gray-400 text-center">A verification code will be sent to this number.</p>

        <div className="relative mt-4">
          <span className="absolute left-3 top-3 text-xl">🇮🇳</span>
          <input
            type="tel"
            placeholder="Your 10 digit number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/, "").slice(0, 10))}
            className="w-full pl-10 p-3 border rounded-lg focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Send OTP Button */}
        <button
          style={{background:"black",color:"white"}}
          disabled={!isValidPhone}
          className={`w-full mt-2 p-2 rounded-lg text-white font-semibold transition ${
            isValidPhone ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Send OTP
        </button>

        {/* Terms & Conditions */}
        <div className="flex items-center mt-4">
          <input type="checkbox" className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500" checked readOnly />
          <p className="text-xs text-gray-500 ml-2">
            By logging in, you agree to <a href="#" className="text-green-600">NEWME’s T&C</a> and <a href="#" className="text-green-600">Shiprocket’s T&C</a> and Privacy Policy.
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-4">Powered by <span className="text-black font-bold">Shiprocket</span></p>
      </div>
    </div>
  );
};

export default MyLogin;
