import React from 'react';
import { useDispatch } from 'react-redux';
import ModalForm from 'src/components/ModalForm';
import { addCompany } from 'src/actions/companyActions';
import PropTypes from 'prop-types';

const AddCompany = ({isVisible, setModalVisible}) => {
    const dispatch = useDispatch();

    const columns = {
        company_name: { name: 'Nome', required: true, value: ''},
        cnpj: { name: 'CNPJ', required: true, value: ''},
        legal_responsible: { name: 'Responsável Legal', required: false, value: ''},
        legal_responsible_phone: { name: 'Telefone', required: false, value: ''},
    };

    const handleSubmit = (formData) => {
        dispatch(addCompany(formData));
        setModalVisible(false);
    };

    return (
        <ModalForm 
            fields={columns} 
            title='Nova Empresa' 
            isVisible={isVisible} 
            setModalVisible={setModalVisible}
            submitForm={handleSubmit}
        />
    );
};

AddCompany.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    setModalVisible: PropTypes.func.isRequired,
};

export default AddCompany;
