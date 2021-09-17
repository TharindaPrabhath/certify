const useLocalStorage = () => {

    const saveAdmin = ({id, username}: {id?: number, username?: string}) => {
        if(id !== undefined && id) localStorage.setItem("currentAdminId", id.toString())
        if(username !== undefined && username) localStorage.setItem("currentAdmin", username);
    }
    
    const getAdmin = () => {
        return {
            id: localStorage.getItem("currentAdminId"),
            username: localStorage.getItem("currentAdmin")
        }
    }
    
    const removeAdmin = () => {
        localStorage.clear();
    }

    return {saveAdmin, getAdmin, removeAdmin}

}

export default useLocalStorage;