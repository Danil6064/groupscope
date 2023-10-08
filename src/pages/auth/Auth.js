import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { apiUrl, url } from "../../helpers/MainConstants";
import "./auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleSuccess = async (response) => {
    try {
      // console.log(
      //   "Full Google Sign In response:",
      //   JSON.stringify(response, null, 2)
      // );

      const googleToken = response.credential;
      // console.log("Received Google Token:", googleToken);

      const decoded = jwt_decode(googleToken);
      // console.log("Decoded Google Token:", decoded);

      const learnerName = decoded.given_name;
      const learnerLastname = decoded.family_name;
      const pictureUrl = decoded.picture;
      localStorage.setItem("userPicture", pictureUrl);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          idToken: googleToken,
          learnerName: learnerName,
          learnerLastname: learnerLastname,
        }),
      };

      // console.log("Sending request to server with options:", requestOptions);

      let res = await fetch(`${url}/oauth2`, requestOptions);
      // console.log("Server Response:", res);

      if (!res.ok) {
        console.error("Server Error Response:", await res.text());
        return;
      }

      const data = await res.json();
      console.log("Received data from server after auth:", data);

      if (data.jwtToken) {
        const jwtToken = data.jwtToken;
        localStorage.setItem("jwtToken", jwtToken);
        login(jwtToken);
        // console.log("Отриманий JWT токен:", jwtToken);

        res = await fetch(`${apiUrl}/student`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Authorization: "Bearer " + jwtToken,
          },
        });

        const studentData = await res.json();
        // console.log("Received student data:", studentData);

        const { learningGroup, role: newRole } = studentData;
        localStorage.setItem("learningGroup", learningGroup);
        localStorage.setItem("userRole", newRole);

        // if (learningGroup) {
        //   const newWindow = window.open("/", "_blank");
        //   if (newWindow) newWindow.opener = null;
        //   window.close();
        // } else {
        //   const newWindow = window.open("/guest", "_blank");
        //   if (newWindow) newWindow.opener = null;
        //   window.close();
        // }

        if(learningGroup) {
                  navigate('/');
                } else {
                  navigate('/guest');
                }
      } else {
        console.error("JWT token not found");
      }
    } catch (error) {
      console.error("Error while communicating with server:", error);
    }
  };

  const handleGoogleFailure = (response) => {
    console.error("Google Sign In was unsuccessful:", response);
  };

  return (
    <div className="auth-container">
      <GoogleLogin
        // buttonText="Увійти через Google"
        // ux_mode="redirect"
        onSuccess={handleGoogleSuccess}
        onFailure={handleGoogleFailure}
      />
    </div>
  );
}


