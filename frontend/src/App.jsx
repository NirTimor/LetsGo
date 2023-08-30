import React from "react";
import { observer } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { useAuthStore } from "./stores/authStore";
import UiAlerts from "./components/UiAlerts";
import AuthenticatedApp from "./app/AuthenticatedApp";
import UnauthenticatedApp from "./app/UnauthenticatedApp";

const App = () => {
	const { isLoggedIn } = useAuthStore();

	return (
		<BrowserRouter>
			{isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}			
			<UiAlerts />
		</BrowserRouter>
	);
}

export default observer(App);
