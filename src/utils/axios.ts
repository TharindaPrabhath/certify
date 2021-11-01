import axios from "axios";
import requests from "../data/requests";
import useLocalStorage from "./useLocalStorage";
import useTokenService from "./useTokenService";

//export const API_BASE_URL = "http://localhost:8080/api/v1";
export const API_BASE_URL = "https://symetry-certify.herokuapp.com/api/v1";
const useAxios = () => {
  const {
    setAccessToken,
    setAccessTokenExpiresAt,
    getAccessToken,
    getRefreshToken,
    getAccessTokenExpiresAt,
  } = useTokenService();
  const { getAdmin } = useLocalStorage();
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },

    baseURL: API_BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const expireAt = getAccessTokenExpiresAt();
      if (Date.now() > Date.parse(expireAt!)) {
        // access token has expired
        // refreshing the access token
        await axios
          .post(API_BASE_URL + requests.refreshToken, {
            refreshToken: getRefreshToken(),
            accessToken: getAccessToken(),
            adminId: getAdmin().id,
          })
          .then((res) => {
            // setting updated token
            setAccessToken(res.data.accessToken);
            setAccessTokenExpiresAt(res.data.accessTokenExpiresAt);
          })
          .catch((err) => console.error(err));
      }
      return config;
    },
    (err) => {
      console.error("error in getting ", err);
    }
  );

  return axiosInstance;
};

export default useAxios;
