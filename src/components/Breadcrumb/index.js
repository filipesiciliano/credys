import React from 'react';
import { useLocation } from 'react-router-dom';
import BreadcrumbItem from './BreadcrumbItem';
import routes from '../../routes';

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
        <nav aria-label="breadcrumb">
            <ol className='breadcrumb my-0'>
                <BreadcrumbItem href="/dashboard">Home</BreadcrumbItem>
                {breadcrumbs.map((breadcrumb, index) => {
                    return (
                    <BreadcrumbItem
                        {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
                        key={index}
                    >
                        {breadcrumb.name}
                    </BreadcrumbItem>
                    );
                })}
            </ol>
        </nav>
  );
};

export default React.memo(AppBreadcrumb);
