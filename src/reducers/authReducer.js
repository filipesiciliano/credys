const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOADED':
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: action.payload
        };
        case 'LOGIN_SUCCESS':
        localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            loading: false
        };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null
        };
        default:
        return state;
    }
};

export default authReducer;
  