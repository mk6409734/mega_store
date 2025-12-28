import React, { useState } from "react";

export const OtpBox = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const handleChange = (e, index) => {
    const value = e.value;
    if (isNaN(value)) return;

    // Update OTP value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus on next input
    if(value && index < length - 1){
        document.getElementById(`otp-input-${index + 1}`).focus()
    }
  };

  const handleKeyDown = (e, index) => {
    if(e.key === "Backspace" && !otp[index] && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {otp.map((_, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-11 h-11 text-center text-lg border border-gray-600 rounded-md"
        />
      ))}
    </div>
  );
};
