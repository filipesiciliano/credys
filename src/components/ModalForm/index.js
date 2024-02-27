import React, { useState } from 'react';
import { 
    CButton, 
    CModal, 
    CModalBody, 
    CModalFooter, 
    CModalHeader, 
    CModalTitle, 
    CFormInput,
    CFormTextarea,
    CForm, 
    CFormLabel, 
    CFormFeedback 
} from '@coreui/react';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

const ModalForm = ({ fields, title, isVisible, setModalVisible, submitForm }) => {
    const [formData, setFormData] = useState(fields);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: {...formData[e.target.id], value: e.target.value }});

        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: '' });
        }
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        Object.keys(fields).forEach(field => {
            if (fields[field].required && !formData[field].value) {
                isValid = false;
                newErrors[field] = 'Este campo é obrigatório';
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const parseDataToRequest = () => {
        const transformedData = {};
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                transformedData[key] = formData[key].value;
            }
        }
    
        return transformedData;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const validData = parseDataToRequest(formData);
            submitForm(validData);
            handleCloseModal();
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setFormData(fields);
        setErrors({});
    };


    return (
        <CModal visible={isVisible} onClose={handleCloseModal}>
            <CModalHeader>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CForm onSubmit={handleSubmit}>
                    {Object.keys(fields).map(field => (
                        <div className="mb-3" key={field}>
                        <CFormLabel htmlFor={field}>{fields[field].name}</CFormLabel>
                        {(fields[field].type === 'textarea') ? (
                                <>
                                    <CFormTextarea
                                        id={field}
                                        name={field}
                                        value={formData[field].value}
                                        onChange={handleChange}
                                        invalid={errors[field] ? true : false}
                                    />
                                    <CFormFeedback invalid>
                                        {errors[field]}
                                    </CFormFeedback>
                                </>
                        ) : (
                            <>
                            {fields[field].mask ? (
                                    <InputMask
                                        mask={fields[field].mask}
                                        value={formData[field].value}
                                        onChange={handleChange}
                                        disabled={false}
                                        maskChar=" "
                                    >
                                        {() => <CFormInput
                                            type="text"
                                            id={field}
                                            name={field}
                                            invalid={errors[field] ? true : false}
                                        />}
                                    </InputMask>
                                ) : (
                                    <CFormInput
                                        type="text"
                                        id={field}
                                        name={field}
                                        value={formData[field].value}
                                        onChange={handleChange}
                                        invalid={errors[field] ? true : false}
                                    />
                                )}
                            </>
                        )
                    }
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

ModalForm.propTypes = {
    title: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
};

export default ModalForm;
