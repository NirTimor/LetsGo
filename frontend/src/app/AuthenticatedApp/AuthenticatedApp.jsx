import React from 'react';
import { observer } from 'mobx-react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useRoutesStore } from '../../stores/routesStore';
import { useDarkModeStore } from '../../stores/darkModeStore';

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
});

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const AuthenticatedApp = () => {
    const { authorizedRoutesList, mainPageRoute } = useRoutesStore();
    const { isDarkMode } = useDarkModeStore();

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <Routes>
                <Route exact path="/" element={<Navigate to={mainPageRoute} />} />                
                {authorizedRoutesList.map((authorizedRoute) => (
                    <Route
                        key={authorizedRoute.key}
                        path={authorizedRoute.path}
                        element={authorizedRoute.component}
                    />
                ))}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ThemeProvider>
    );
};

export default observer(AuthenticatedApp);
