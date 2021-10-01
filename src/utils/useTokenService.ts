const useTokenService = () => {

    const setAccessToken = (accessToken: string) => {
        localStorage.setItem("accessToken", accessToken);
    }

    const setRefreshToken = (refreshToken: string) => {
        localStorage.setItem("refreshToken", refreshToken);
    }

    const setAccessTokenExpiresAt = (expiresAt: string) => {
        localStorage.setItem("accessTokenExpiresAt", expiresAt);
    }

    const setRefreshTokenExpiresAt = (expiresAt: string) => {
        localStorage.setItem("refreshTokenExpiresAt", expiresAt);
    }
    
    const getAccessToken = () => {
        return localStorage.getItem("accessToken");
    }

    const getRefreshToken = () => {
        return localStorage.getItem("refreshToken");
    }

    const getAccessTokenExpiresAt = () => {
        return localStorage.getItem("accessTokenExpiresAt");
    }

    const getRefreshTokenExpiresAt = () => {
        return localStorage.getItem("refreshTokenExpiresAt");
    }
    
    const removeAccessToken = () => {
        localStorage.removeItem("accessToken");
    }

    const removeRefreshToken = () => {
        localStorage.removeItem("refreshToken");
    }

    const removeAccessTokenExpiresAt = () => {
        localStorage.removeItem("accessTokenExpiresAt");
    }

    const removeRefreshTokenExpiresAt = () => {
        localStorage.removeItem("refreshTokenExpiresAt");
    }

    return {setAccessToken, setRefreshToken, setAccessTokenExpiresAt, setRefreshTokenExpiresAt, getAccessToken, 
        getRefreshToken, getAccessTokenExpiresAt, getRefreshTokenExpiresAt, removeAccessToken, removeRefreshToken,
        removeAccessTokenExpiresAt, removeRefreshTokenExpiresAt}
}

export default useTokenService;