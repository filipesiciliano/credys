import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react';
import { Table } from 'src/components/Table';
import { listCompanies } from 'src/actions/companyActions';
import AddCompany from './addCompany';

const Companies = () => {
  const [addCompanyModalVisible, setAddCompanyModalVisible] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(state => state.company.companies);
  console.log(data);
  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'company_name' },
    { header: 'CNPJ', accessor: 'cnpj' },
    { header: 'Responsável Legal', accessor: 'legal_responsible' },
    { header: 'Telefone Responsável', accessor: 'legal_responsible_phone' },
  ];

  useEffect(() => {
    dispatch(listCompanies());
  }, [dispatch]);

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between align-items-center">
              <h5>Empresas</h5>
              <CButton color="primary" onClick={() => setAddCompanyModalVisible(true)}>
                Adicionar Empresa
              </CButton>
            </CCardHeader>
            <CCardBody>
              <Table columns={columns} data={data}/>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <AddCompany isVisible={addCompanyModalVisible} setModalVisible={setAddCompanyModalVisible}/>
    </>
  );
};

export default Companies;
