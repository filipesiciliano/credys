import api from '../config/server';

export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/api/auth/user');
    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
};

export const check = (navigate) => async dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const res = await api.get('/api/auth/check', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch({
        type: 'AUTH_SUCCESS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR'
      });
    }
  } else {
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
}; 

export const login = ({ email, password }, navigate) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/api/auth/login', body);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
    dispatch(loadUser());
    navigate('/dashboard');
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: 'LOGOUT' });
};
