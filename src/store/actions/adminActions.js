import { toast } from 'react-toastify';
import {
  createNewUserService,
  deleteUserService,
  getAllCodeService,
  getAllUsers,
  editUserService,
} from '../../services/userService';
import actionTypes from './actionTypes';

import 'react-toastify/dist/ReactToastify.css';

export const fetchGenderStart = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService('GENDER');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch) => {
    try {
      let res = await getAllCodeService('POSITION');
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch) => {
    try {
      let res = await getAllCodeService('ROLE');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// CREATE_USER_SUCCESS

export const createNewUser = (data) => {
  return async (dispatch) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Create new user successfully!');
        dispatch(createUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error('Create new user failed!');
        dispatch(createUserFailed());
      }
    } catch (error) {
      dispatch(createUserFailed());
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUserStart = () => {
  return async (dispatch) => {
    try {
      let res = await getAllUsers('ALL');
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      dispatch(fetchAllUserFailed());
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

// Delete user

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      let res = await deleteUserService(id);
      if (res && res.errCode === 0) {
        toast.success('Delete user successfully!');
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error('Delete user failed!');
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      dispatch(deleteUserFailed());
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

// Edit user

export const editUser = (data) => {
  return async (dispatch) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success('Edit user successfully!');
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error('Edit user failed!');
        dispatch(editUserFailed());
      }
    } catch (error) {
      dispatch(editUserFailed());
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
