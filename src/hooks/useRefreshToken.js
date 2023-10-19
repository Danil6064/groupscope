import axios from "../api/axios.js";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    await axios
      .get("/refresh", { withCredentials: true })
      .then((response) => {
        const { jwtToken, role } = response.data;

        setAuth((prev) => {
          console.log("Auth:", prev);
          console.log("Refresh:", response.data);
          return { ...prev, accessToken: jwtToken, role: role };
        });

        // return jwtToken;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return refresh;
}
