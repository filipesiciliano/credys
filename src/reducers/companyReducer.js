const initialState = {
    companies: [],
    isLoading: true,
    isRequesting: false,
    error: null,
  };
  
const companyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'COMPANY_SUCCESS':
        return {
            ...state,
            isLoading: false,
            companies: action.payload.companies,
            isRequesting: false,
            error: null
        };
        case 'COMPANY_REQUEST':
        return {
            ...state,
            isLoading: true,
            isRequesting: true,
            error: null
        };
        case 'COMPANY_ERROR':
        return {
            ...state,
            companies: [],
            isLoading: false,
            error: null,
            isRequesting: false
        };
        default:
        return state;
    }
};

export default companyReducer;
  