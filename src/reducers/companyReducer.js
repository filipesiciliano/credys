const initialState = {
    companies: [],
    isLoading: true,
    isRequesting: false,
    error: false,
  };
  
const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'COMPANY_REQUEST':
        return {
            ...state,
            isLoading: true,
            isRequesting: true,
            error: false
        };
        case 'LIST_COMPANY_SUCCESS':
        return {
            ...state,
            isLoading: false,
            companies: action.payload,
            isRequesting: false,
            error: false
        };
        case 'LIST_COMPANY_ERROR':
        return {
            ...state,
            companies: [],
            isLoading: false,
            error: true,
            isRequesting: false
        };
        case 'ADD_COMPANY_SUCCESS':
        return {
            ...state,
            companies: [...state.companies, action.payload],
            isLoading: false,
            isRequesting: false,
            error: false
        };
        case 'ADD_COMPANY_ERROR':
        return {
            ...state,
            isLoading: false,
            isRequesting: false,
            error: true
        };
        case 'GET_COMPANY_SUCCESS':
        return {
            ...state,
            isLoading: false,
            isRequesting: false,
            error: false
        };
        case 'GET_COMPANY_ERROR':
        return {
            ...state,
            isLoading: false,
            isRequesting: false,
            error: true
        };
        default:
        return state;
    }
};

export default companyReducer;
  