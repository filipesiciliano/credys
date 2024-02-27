import React from 'react';
import ModalForm from 'src/components/ModalForm';
import PropTypes from 'prop-types';

const AddCompany = ({isVisible, handleSubmit, setModalVisible, isLoading}) => {

    const fields = {
        company_name: { name: 'Nome', required: true, value: ''},
        cnpj: { name: 'CNPJ', required: true, value: '', mask: '99.999.999/9999-99'},
        legal_responsible: { name: 'Responsável Legal', required: false, value: ''},
        legal_responsible_phone: { name: 'Telefone', required: false, value: '', mask: '(99) 99999-9999'},
    };

    return (
        <ModalForm 
            fields={fields} 
            title='Nova Empresa' 
            isVisible={isVisible}
            setModalVisible={setModalVisible}
            submitForm={handleSubmit}
            isLoading={isLoading}
        />
    );
};

AddCompany.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
};

export default AddCompany;
