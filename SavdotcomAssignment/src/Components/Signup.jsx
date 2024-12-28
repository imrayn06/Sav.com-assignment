import React, { useState } from "react";
import ReCaptchaComponent from '../Components/ReCaptchaComponent';
import { useNavigate } from "react-router-dom";
import "../Components/CSS/Signup.css"

const Signup = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isVerified, setIsVerified] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert("Form Submitted!");
    
    //product page
    navigation("/products");
  };

  const isFormValid = formData.email.trim() !== '' && formData.password.trim() !== '';

  return (
    <div className="signupContainer">
      <div className="signupBox">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="email" className="formLabel">
              Email Id
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="formInput"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formGroup">
            <label htmlFor="password" className="formLabel">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="formInput"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <ReCaptchaComponent onVerify={setIsVerified} />
          <button
            type="submit"
            disabled={!isVerified || !isFormValid}
            className="submitButton"
          >
            Sign Up
          </button>
        </form>
        {/* <p className="signInText">
          Already have an account ?{" "}
          <span className="signInLink"> Log In</span>
        </p> */}
      </div>
    </div>
  );
};

export default Signup;
