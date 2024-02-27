import React from 'react';
import { CPagination, CPaginationItem } from '@coreui/react';
import PropTypes from 'prop-types';

const Pagination = ({ paginationData: { total, limit, currentPage, totalPages, prevPage, nextPage }, paginate }) => {
    const handlePageClick = (page) => () => paginate(page);

    const PaginationItem = ({ page, children, ...rest }) => (
        <CPaginationItem
            {...rest}
            active={currentPage === page}
            onClick={handlePageClick(page)}
        >
            {children || page}
        </CPaginationItem>
    );

    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return (
        <>
            <CPagination aria-label="Navegação de página">
                <PaginationItem page={currentPage - 1} aria-label="Anterior" disabled={!prevPage}>
                    &laquo;
                </PaginationItem>
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
                    <PaginationItem key={page} page={page} />
                ))}
                <PaginationItem page={currentPage + 1} aria-label="Próximo" disabled={!nextPage}>
                    &raquo;
                </PaginationItem>
            </CPagination>
            <div>
                <span>{`Exibindo ${Math.min(limit * (currentPage - 1) + 1, total)}-${Math.min(limit * currentPage, total)} de ${total} itens`}</span>
            </div>
        </>
    );
};

Pagination.propTypes = {
    page: PropTypes.number,
    children: PropTypes.node,
    paginationData: PropTypes.shape({
        total: PropTypes.number,
        limit: PropTypes.number,
        currentPage: PropTypes.number,
        totalPages: PropTypes.number,
        prevPage: PropTypes.number,
        nextPage: PropTypes.number,
    }),
    paginate: PropTypes.func.isRequired,
};

export default Pagination;
