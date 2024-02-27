import React, { useState } from 'react';
import { CTable, CTableHead, CTableDataCell,  CTableHeaderCell, CTableBody, CTableRow, CFormSelect } from '@coreui/react';
import Pagination from './pagination';
import PropTypes from 'prop-types';

const INITIAL_VALUES = {
    itemsPerPageOptions: ['10', '20', '30', '50', '100']
};

export const Table = ({ 
    columns = [], 
    data = [], 
    meta: paginationData = {}, 
    isLoading = false,
    paginate,
}) => {
    const [limit, setLimit] = useState();

    const handleLimitsPerPage = (event) => {
        setLimit(Number(event.target.value));
        paginate(1, Number(event.target.value));
    };

    const handleSetPage = (page) => {
        paginate(page, limit);
    };

    return (
        <>
            <div className='d-flex align-items-center'>
                <CFormSelect
                    className='w-auto'
                    label="Itens por página:"
                    aria-label="Itens por página"
                    value={limit} onChange={handleLimitsPerPage}
                    options={INITIAL_VALUES.itemsPerPageOptions}
                />
            </div>
            <CTable hover>
                <CTableHead>
                    <CTableRow>
                        {columns.map((column, index) => (
                            <CTableHeaderCell key={index} scope="col">
                                {column.header}
                            </CTableHeaderCell>
                        ))}
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                            <CTableRow key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <CTableDataCell key={colIndex}>
                                        {item[column.accessor]}
                                    </CTableDataCell>
                                ))}
                            </CTableRow>
                        ))
                    ) : (
                        <CTableRow>
                            <CTableDataCell colSpan={columns.length}>Nenhuma dado encontrado</CTableDataCell>
                        </CTableRow>
                    )}  
                </CTableBody>
            </CTable>
            <Pagination paginationData={paginationData} isLoading={isLoading} paginate={handleSetPage} />
        </>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.string.isRequired,
            accessor: PropTypes.string.isRequired,
        })
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    meta: PropTypes.object,
    isLoading: PropTypes.bool,
    paginate: PropTypes.func.isRequired,
};
