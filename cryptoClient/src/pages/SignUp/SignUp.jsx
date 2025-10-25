import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import signupAsset from "../../assets/signupAsset.png";
import googleIcon from "../../assets/Google.png";
import metamaskIcon from "../../assets/Metamask.png";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    backgroundColor: "#e9e8fc",
    borderRadius: "20px",
    "&:before, &:after, &:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .MuiInputBase-input": {
      fontSize: "20px",
      height: "35px",
    },
    "& .MuiInputLabel-root": {
      fontSize: "30px",
      height: "35px",
    },
  },
}));

function SignUp() {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (field, value) => {
    let error = "";
    switch (field) {
      case "firstName":
      case "lastName":
        if (!value.match(/^[A-Za-z]+$/)) error = "Only letters allowed";
        break;
      case "email":
        if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) error = "Invalid email format";
        break;
      case "phone":
        if (!value.match(/^\d{10}$/)) error = "Phone must be 10 digits";
        break;
      case "password":
        if (value.length < 6) error = "Must be at least 6 characters";
        break;
      case "rePassword":
        if (value !== formData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSignUp = async () => {
    const newErrors = Object.keys(formData).reduce((acc, field) => {
      acc[field] = validate(field, formData[field]);
      return acc;
    }, {});
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    if (Object.values(newErrors).some((err) => err)) return;

    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        userName: `${formData.firstName} ${formData.lastName}`,
        userEmail: formData.email,
        userPhone: formData.phone,
        pwd: formData.password,
      });
      if (res.data.isSuccess) navigate("/login");
    } catch (error) {
      console.log("Error in posting signup", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/google", { tokenId: response.access_token }, { withCredentials: true });
        if (res.data.isSuccess) {
          setIsAuth(true);
          setUser(res.data.user.userEmail);
          navigate("/");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <Box style={{ margin: "45px auto 0 auto", width: "80vw", height: "858px" }} sx={{ bgcolor: "#FFFFFF", borderRadius: "20px", display: "flex", justifyContent: "center" }}>
      <Box style={{ width: "700px", height: "800px", margin: "30px" }} sx={{ borderRadius: "20px", padding: "40px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {["firstName", "lastName"].map((field) => (
            <Box sx={{ width: "100%" }} key={field}>
              <CustomTextField
                name={field}
                label={field === "firstName" ? "First Name" : "Last Name"}
                variant="filled"
                sx={{ width: "100%", height: "80px", mt: "20px" }}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors[field]}
                helperText={errors[field]}
              />
            </Box>
          ))}
        </Box>

        {["email", "password", "rePassword", "phone"].map((field, index) => (
          <CustomTextField
            key={index}
            name={field}
            label={field === "rePassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
            variant="filled"
            type={field.includes("password") ? "password" : "text"}
            sx={{ width: "100%", height: "80px", mt: "20px" }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors[field]}
            helperText={errors[field]}
          />
        ))}

        <Button style={{ width: "100%", height: "67px", fontSize: "32px", backgroundColor: "#352A71", borderRadius: "20px" }} sx={{ mt: "40px", mb: "20px" }} variant="contained" onClick={handleSignUp}>
          Signup
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
          <Button sx={{ width: "100%", height: "61px", fontSize: "24px", borderRadius: "20px", borderColor: "#000" }} variant="outlined" onClick={googleLogin}>
            <img src={googleIcon} alt="googleIcon" /> &nbsp; Google
          </Button>
          {/* <Button sx={{ width: "100%", height: "61px", fontSize: "24px", borderRadius: "20px", borderColor: "#000" }} variant="outlined">
            <img src={metamaskIcon} alt="metamaskIcon" /> &nbsp; Metamask
          </Button> */}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <div className="loginSignup">
            Already registered? <Link to="/login" className="loginSignupC">Login</Link>
          </div>
        </Box>
      </Box>

      <Box style={{ width: "700px", height: "800px", margin: "30px" }} sx={{ borderRadius: "20px" }}>
        <img style={{ width: "100%", height: "100%", objectFit: "fill" }} src={signupAsset} alt="signupPageImage"></img>
      </Box>
    </Box>
  );
}

export default SignUp;
