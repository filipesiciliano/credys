import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const BreadcrumbItem = ({ children, active, className, href}) => {
    return (
      <li
        className={classNames(
          'breadcrumb-item',
          {
            active: active,
          },
          className,
        )}
        {...(active && { 'aria-current': 'page' })}
      >
        {href ? <Link to={href}>{children}</Link> : children}
      </li>
    );
};

BreadcrumbItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
};

export default BreadcrumbItem;