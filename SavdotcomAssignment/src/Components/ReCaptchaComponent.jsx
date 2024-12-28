import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptchaComponent = ({ onVerify }) => {
  const handleReCaptchaChange = (token) => {
    if (token) {
      onVerify(true);
    } else {
      onVerify(false);
    }
    console.log(token);
  };
  return (
    <div className="recaptchaContainer">
      <ReCAPTCHA
        sitekey="6LcfZqcqAAAAAEregqtTrjVsYdIDOEySzVe5geOs"
        onChange={handleReCaptchaChange}
      />
    </div>
  );
};

export default ReCaptchaComponent;
