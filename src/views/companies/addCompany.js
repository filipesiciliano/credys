import React, { useState } from 'react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CFormInput, CForm, CFormLabel, CFormFeedback } from '@coreui/react';
import PropTypes from 'prop-types';

const AddCompany = ({ isVisible, setAddCompanyModalVisible }) => {
    const initialCompanyData = {
        id: '',
        name: '',
        cnpj: '',
        address: ''
    };

    const [companyData, setCompanyData] = useState(initialCompanyData);
    const [errors, setErrors] = useState({});

    const fields = {
        id: { required: true },
        name: { required: true },
        cnpj: { required: true },
        address: { required: false }
    };

    const handleChange = (e) => {
        setCompanyData({ ...companyData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        Object.keys(fields).forEach(field => {
            if (fields[field].required && !companyData[field]) {
                isValid = false;
                newErrors[field] = 'Este campo é obrigatório';
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(companyData);
            handleCloseModal();
        }
    };

    const handleCloseModal = () => {
        setAddCompanyModalVisible(false);
        setCompanyData(initialCompanyData); // Reset company data
        setErrors({}); // Clear any errors
    };

    return (
        <CModal visible={isVisible} onClose={handleCloseModal}>
            <CModalHeader>
                <CModalTitle>Nova Empresa</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleSubmit}>
                    {Object.keys(fields).map(field => (
                        <div className="mb-3" key={field}>
                            <CFormLabel htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</CFormLabel>
                            <CFormInput
                                type="text"
                                id={field}
                                name={field}
                                value={companyData[field]}
                                onChange={handleChange}
                                invalid={errors[field] ? true : false}
                            />
                            <CFormFeedback invalid>
                                {errors[field]}
                            </CFormFeedback>
                        </div>
                    ))}
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={handleCloseModal}>
                    Fechar
                </CButton>
                <CButton color="primary" onClick={handleSubmit}>Salvar</CButton>
            </CModalFooter>
        </CModal>
    );
};

AddCompany.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    setAddCompanyModalVisible: PropTypes.func.isRequired
};

export default AddCompany;
