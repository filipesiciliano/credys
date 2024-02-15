import api from '../config/server';

export const listCompanies = () => async dispatch => {
    dispatch({ type: 'COMPANY_REQUEST' });
    try {
        const res = await api.get('/api/companies');
        dispatch({
            type: 'COMPANY_SUCCESS',
            payload: res.data
        });
        return res.data;
    } catch (err) {
        dispatch({
            type: 'COMPANY_ERROR'
        });
    }
};
