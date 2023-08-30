import React from "react";
import { Alert, Link, Box, Typography, Container } from "@mui/material";
import LetsGoLogo from "../../components/LetsGoLogo";

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{"Copyright © "}
			<Link color="inherit" href="/">
				Let'sGo
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const UnauthenticatedTemplate = ({ handleSubmit = () => {}, isError, errorMessage, children }) => {
	return (
		<Container maxWidth={false} sx={{ 
			bgcolor: 'primary.main',
			width: '100vw',
			height: '100vh',
			overflow: 'hidden'
		}}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '30px',
					boxShadow: 5,
					padding: '20px',
					bgcolor: 'white',
                    width: '400px',
				}}
			>
				<LetsGoLogo />
				<Box 
					component="form" 
					onSubmit={(event) => {
						event.preventDefault();
						handleSubmit(event)
					}}
					sx={{
						display: 'grid',
						gridGap: '20px',
                        width: 'inherit',
					}}
				>
					{isError && <Alert severity="error" sx={{ marginBottom: '5px' }}>{errorMessage}</Alert>}
                    {children}
				</Box>
				<Copyright />
			</Box>
		</Container>
	);
};

export default UnauthenticatedTemplate;
