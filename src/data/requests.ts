const login = "/auth/login";
const validateToken = "/auth/validateToken";
const refreshToken = "/auth/refresh-token";
const validateCertificate = "/certificate/validate";
const changePassword = "/admin/change-password";

const fetchAdminByUsername = "/admin/get/byUsername";
const fetchAdmins = "/admin";
const fetchUser = "/user/get";
const fetchUsers = "/user";
const fetchSuggestionUsers = "/user/get-suggestions";
const fetchCertificate = "/certificate/get";
const fetchCertificates = "/certificate";
const fetchCertificatesByUser = "/certificate/byUser";
const fetchAdminsAnalytics = "/analytics/admin";
const fetchUsersAnalytics = "/analytics/user";
const fetchCertificatesAnalytics = "/analytics/certificate";
const fetchActivities = "/activity";
const fetchEvents = "/event";
const fetchReports = "/certificate-bulk-report";

const postNewUser = "/user/add";
const postNewCertificate = "/certificate/add";
const postNewThirdPartyCertificate = "/certificate/add/third-party";
const postCertificateBulk = "/certificate-bulk/add";

const updateUser = "/user/update";
const updateCertificate = "/certificate/update";

const deleteUser = "/user/delete";
const deleteCertificate = "/certificate/delete";

const requests = {
  login,
  validateToken,
  refreshToken,
  validateCertificate,
  changePassword,
  fetchAdminByUsername,
  fetchAdmins,
  fetchUser,
  fetchUsers,
  fetchSuggestionUsers,
  fetchCertificate,
  fetchCertificatesByUser,
  fetchCertificates,
  fetchAdminsAnalytics,
  fetchUsersAnalytics,
  fetchCertificatesAnalytics,
  fetchActivities,
  fetchEvents,
  fetchReports,
  postNewUser,
  postNewCertificate,
  postNewThirdPartyCertificate,
  postCertificateBulk,
  updateUser,
  updateCertificate,
  deleteUser,
  deleteCertificate,
};

export default requests;
