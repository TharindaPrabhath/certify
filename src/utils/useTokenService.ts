const useTokenService = () => {

    const setAccessToken = (accessToken: string) => {
        localStorage.setItem("accessToken", accessToken);
    }
    
    const getAccessToken = () => {
        return localStorage.getItem("accessToken");
    }
    
    const removeAccessToken = () => {
        localStorage.removeItem("accessToken");
    }

    return {setAccessToken, getAccessToken, removeAccessToken}
}

export default useTokenService;