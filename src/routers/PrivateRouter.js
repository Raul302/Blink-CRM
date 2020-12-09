import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

function PrivateRouter({
    isAuthenticated,
    component: Component,
    ...rest
})
{
    localStorage.setItem('lastPath',rest.location.pathname);
    return (
        <Route {...rest}
            component={(props) => (
                (isAuthenticated)
                    ? <Component {...props} />
                    : (<Redirect to="/login" />)
            )}
        />
    )
}

export default PrivateRouter
    PrivateRouter.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        component: PropTypes.func.isRequired
    }
