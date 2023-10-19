import axios from "../api/axios.js";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = () => {
    let newAccessToken;
    axios
      .get("/refresh", { withCredentials: true })
      .then((response) => {
        setAuth((prev) => {
          console.log("Auth:", prev);
          console.log("Refresh:", response.data);
          return { ...prev, accessToken: response.data.jwtToken };
        });
        newAccessToken = response.data.jwtToken;
      })
      .catch((error) => {
        console.error(error);
      });
    return newAccessToken;
  };
  return refresh;
}
