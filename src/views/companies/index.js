import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { Table } from 'src/components/Table';
import { listCompanies } from 'src/actions/companyActions';

const Companies = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.company.companies);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Nome', accessor: 'name' },
    { header: 'CNPJ', accessor: 'cnpj' },
    { header: 'Endereço', accessor: 'address' }
  ];

  useEffect(() => {
    dispatch(listCompanies());
  }, [dispatch]);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <h5>Empresas</h5>
          </CCardHeader>
          <CCardBody>
            <Table columns={columns} data={data}/>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Companies;
