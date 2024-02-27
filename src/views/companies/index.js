import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CProgress,
} from '@coreui/react';
import { Table } from 'src/components/Table';
import { listCompanies, addCompany } from 'src/actions/companyActions';
import AddCompany from './addCompany';

const Companies = () => {
  const [addCompanyModalVisible, setAddCompanyModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addCompanyLoading, setAddCompanyLoading] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector(state => state.company.companies);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'company_name' },
    { header: 'CNPJ', accessor: 'cnpj' },
    { header: 'Responsável Legal', accessor: 'legal_responsible' },
    { header: 'Telefone Responsável', accessor: 'legal_responsible_phone' },
  ];

  const handlePagination = (page, limit) => {
    setIsLoading(true);
    dispatch(listCompanies(page, limit)).then(() => {
      setIsLoading(false);
    });
  };

  const handleSubmit = (data) => {
    setAddCompanyLoading(true);
    dispatch(addCompany(data)).then(() => {
      setAddCompanyModalVisible(false);
      setAddCompanyLoading(false);
      setIsLoading(true);
      dispatch(listCompanies()).then(() => {
        setIsLoading(false);
      });
    });
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(listCompanies()).then(() => {
      setIsLoading(false);
    });
  }, []);

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
            {isLoading && (
                <CProgress color="info" height={4} variant="striped" animated value={100} />
            )}
            <CCardBody style={{ opacity: isLoading ? 0.3 : 1}} >
              <Table 
                columns={columns} 
                data={data.data} 
                isLoading={isLoading} 
                meta={data.meta} 
                paginate={handlePagination}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <AddCompany 
        isVisible={addCompanyModalVisible} 
        setModalVisible={setAddCompanyModalVisible} 
        handleSubmit={handleSubmit}
        isLoading={addCompanyLoading}
      />
    </>
  );
};

export default Companies;
