import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import "./auth.css";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Auth() {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const login = () => {
    // console.log("Auth", auth);
    // console.log("Token in login",  axiosPrivate.defaults.headers.common["Authorization"])

    axiosPrivate
      .get("/api/student")
      .then(function (response) {
        // console.log("get /api/student:", response);
        const { name, lastname, role, learningGroup } = response.data;
        console.log(
          "User:",
          name,
          lastname,
          "Role:",
          role,
          "LearningGroup:",
          learningGroup
        );
        setAuth((prev) => {
          return { ...prev, name, lastname, role, learningGroup };
        });
        learningGroup ? navigate("/home") : navigate("/guest");
      })

      .catch(function (error) {
        console.error(error);
      });
  };

  const handleOnSuccess = (credentialResponse) => {
    const credential = credentialResponse.credential;

    // console.log("Credential: " + credential);

    const decoded = jwt_decode(credential);
    // console.log("Decoded Google Token:", decoded);

    const learnerName = decoded.given_name;
    const learnerLastname = decoded.family_name;
    sessionStorage.setItem("pictureUrl", decoded.picture);

    axios
      .post(
        "/oauth2",
        {
          idToken: credential,
          learnerName: learnerName,
          learnerLastname: learnerLastname,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        const accessToken = response.data.jwtToken;
        setAuth({ accessToken });

        axiosPrivate.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        login();
        // console.log("Response jwt", jwtToken);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="auth-container">
      <Login onLoginSuccess={handleOnSuccess} />
    </div>
  );
}

function Login({ onLoginSuccess }) {
  return (
    <GoogleLogin
      // ux_mode="redirect"
      // login_uri=""
      onSuccess={onLoginSuccess}
      onError={() => {
        console.log("Login Failed");
      }}
      useOneTap
    />
  );
}
