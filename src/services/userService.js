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

export { handleLoginApi, getAllUsers, createNewUserService, deleteUserService, editUserService, getAllCodeService };