const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token') || false,
    isLoading: false,
    isrequesting: false,
    user: null
  };
  
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_REQUEST':
        return {
            ...state,
            isLoading: true,
            isrequesting: true
        };
        case 'USER_LOADED':
        case 'AUTH_SUCCESS':
        return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: action.payload,
            isrequesting: false
        };
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token);
        return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false,
            isrequesting: false
        };
        case 'AUTH_ERROR':
        case 'LOGIN_FAIL':
        case 'LOGOUT':
        localStorage.removeItem('token');
        return {
            ...state,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            user: null,
            isrequesting: false
        };
        default:
        return state;
    }
};

export default authReducer;
  