const login = "/auth/login"

const fetchAdmins = "/admin"
const fetchUser = "/user/get"
const fetchUsers = "/user"
const fetchCertificates = "/certificate"

const postNewUser = "/user/add"
const postNewCertificate = "/certificate/add"

const updateUser = "/user/update"
const updateCertificate = "/certificate/update"

const deleteUser = "/user/delete"
const deleteCertificate = "/certificate/delete"

const requests = {login, fetchAdmins, fetchUser, fetchUsers, 
                fetchCertificates, postNewUser, postNewCertificate, 
                updateUser, updateCertificate, deleteUser, deleteCertificate}
    
export default requests;
