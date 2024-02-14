import axios from 'axios';

// Carregar usuário
export const loadUser = () => async dispatch => {
  // Supondo que você tenha um endpoint para verificar o usuário pelo token
  try {
    const res = await axios.get('/api/auth/user');
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

// Login
export const login = ({ email, password }) => async dispatch => {
  const body = { email, password };

  try {
    const res = await axios.post('/api/auth/login', body);
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL'
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: 'LOGOUT' });
};
