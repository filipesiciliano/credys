import api from '../config/server';

const listCompanies = () => async dispatch => {
    dispatch({ type: 'COMPANY_REQUEST' });
    try {
        const res = await api.get('/api/companies');
        dispatch({
            type: 'LIST_COMPANY_SUCCESS',
            payload: res.data
        });
        return res.data;
    } catch (err) {
        dispatch({
            type: 'LIST_COMPANY_ERROR'
        });
    }
};

const addCompany = (data) => async dispatch => {
    dispatch({ type: 'COMPANY_REQUEST' });
    try {
        const res = await api.post('/api/companies/new', data);
        dispatch({
            type: 'ADD_COMPANY_SUCCESS',
            payload: res.data
        });
        return res.data;
    } catch (err) {
        dispatch({
            type: 'ADD_COMPANY_ERROR'
        });
    }
};

const getCompanyById = (id) => async dispatch => {
    dispatch({ type: 'COMPANY_REQUEST' });
    try {
        const res = await api.get(`/api/companies/${id}`);
        dispatch({
            type: 'GET_COMPANY_SUCCESS',
            payload: res.data
        });
        return res.data;
    } catch (err) {
        dispatch({
            type: 'GET_COMPANY_ERROR'
        });
    }
};

const updateCompany = (id, data) => async dispatch => {
    dispatch({ type: 'COMPANY_REQUEST' });
    try {
        const res = await api.put(`/api/companies/${id}`, data);
        dispatch({
            type: 'UPDATE_COMPANY_SUCCESS',
            payload: res.data
        });
        return res.data;
    } catch (err) {
        dispatch({
            type: 'UPDATE_COMPANY_ERROR'
        });
    }
};

const deleteCompany = (id) => async dispatch => {
    dispatch({ type: 'COMPANY_REQUEST' });
    try {
        const res = await api.delete(`/api/companies/${id}`);
        dispatch({
            type: 'DELETE_COMPANY_SUCCESS',
            payload: res.data
        });
        return res.data;
    } catch (err) {
        dispatch({
            type: 'DELETE_COMPANY_ERROR'
        });
    }
};

export { listCompanies, addCompany, getCompanyById, updateCompany, deleteCompany };
