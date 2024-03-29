import axios from '../axios';
const handleLoginApi = (userEmail, userPassword) => {
  return axios.post('/api/login', { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId });
};

const createNewUserService = (data) => {
  return axios.post('/api/create-new-user', data);
};

const deleteUserService = (userId) => {
  return axios.delete('/api/delete-user', { data: { id: userId } });
};

const editUserService = (data) => {
  return axios.put('/api/edit-user', data);
};

const getAllCodeService = (inputdata) => {
  return axios.get('/api/allcode?type=' + inputdata);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get('/api/get-all-doctors');
};

const saveDetailDoctorService = (data) => {
  return axios.post('/api/save-info-doctor', data);
};

const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post('/api/bulk-create-schedule', data);
};

const getScheduleDoctorbyDate = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInfoDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post('/api/patient-book-appointment', data);
};

const postVerifyBookAppoinment = (data) => {
  return axios.post('/api/verify-book-appointment', data);
};

const createNewSpecialty = (data) => {
  return axios.post('/api/create-new-specialty', data);
};

const getAllSpecialties = () => {
  return axios.get('/api/get-all-specialties');
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

const createNewClinic = (data) => {
  return axios.post('/api/create-new-clinic', data);
};

const getAllClinic = () => {
  return axios.get('/api/get-all-clinic');
};

const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
};

const postSendRemedy = (data) => {
  return axios.post('/api/send-remedy', data);
};

const getKeywordClinic = (data) => {
  return axios.get(`/api/get-keyword-clinic?keyword=${data.keyword}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorbyDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppoinment,
  createNewSpecialty,
  getAllSpecialties,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  getKeywordClinic,
};
