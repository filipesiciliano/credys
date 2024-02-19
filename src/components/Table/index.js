import React from 'react';
import { CTable, CTableHead, CTableDataCell, CTableHeaderCell, CTableBody, CTableRow } from '@coreui/react';
import PropTypes from 'prop-types';

export const Table = ({ columns = [], data = [], isLoading = false }) => {
    console.log(data, isLoading);
    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <CTable>
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
                            data.map((row, rowIndex) => (
                                <CTableRow key={rowIndex}>
                                    {columns.map((column, colIndex) => (
                                        <CTableDataCell key={colIndex}>
                                            {row[column.accessor]}
                                        </CTableDataCell>
                                    ))}
                                </CTableRow>
                            ))
                        ) : (
                            <CTableRow>
                                <CTableDataCell colSpan={columns.length}>Nenhuma empresa cadastrada</CTableDataCell>
                            </CTableRow>
                        )}
                    </CTableBody>
                </CTable>
            )}
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
    isLoading: PropTypes.bool,
};
