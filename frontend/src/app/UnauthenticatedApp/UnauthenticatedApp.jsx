import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routesStore from '../../stores/routesStore';

const UnauthenticatedApp = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Navigate to={routesStore.unauthorizedRoutes.login.path} />} />
            {routesStore.unauthorizedRoutesList.map((unauthorizedRoute) => (
                <Route 
                    key={unauthorizedRoute.key}
                    path={unauthorizedRoute.path}
                    element={unauthorizedRoute.component}
                />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
};

export default UnauthenticatedApp;
