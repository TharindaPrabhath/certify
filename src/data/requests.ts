const login = "/auth/login"
const validateToken = "/auth/validateToken"
const validateCertificate = "/certificate/validate"

const fetchAdminByUsername = "/admin/get/byUsername"
const fetchAdmins = "/admin"
const fetchUser = "/user/get"
const fetchUsers = "/user"
const fetchCertificate = "/certificate/get"
const fetchCertificates = "/certificate"
const fetchUsersAnalytics = "/analytics/user"
const fetchCertificatesAnalytics = "/analytics/certificate"

const postNewUser = "/user/add"
const postNewCertificate = "/certificate/add"

const updateUser = "/user/update"
const updateCertificate = "/certificate/update"

const deleteUser = "/user/delete"
const deleteCertificate = "/certificate/delete"

const requests = {login, validateToken, validateCertificate, fetchAdminByUsername , fetchAdmins, fetchUser, fetchUsers, fetchCertificate,
                fetchCertificates, fetchUsersAnalytics, fetchCertificatesAnalytics, postNewUser, postNewCertificate, 
                updateUser, updateCertificate, deleteUser, deleteCertificate}
    
export default requests;
