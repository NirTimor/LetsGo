import React, { useState } from "react";
import { observer } from 'mobx-react';
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Tooltip, MenuItem } from "@mui/material";
import { AccountCircle, DarkModeOutlined as DarkModeOutlinedIcon, WbSunnyOutlined as WbSunnyOutlinedIcon, HomeOutlined as HomeOutlinedIcon, Mail as MailIcon, Map as MapIcon } from "@mui/icons-material";
import { useDarkModeStore } from "../../stores/darkModeStore";
import Search from '../inputs/Search';
import LetsGoLogo from "../LetsGoLogo";
import authStore from "../../stores/authStore";
import { RouterLink } from "../Typography";
import { useUsersStore } from "../../stores/usersStore";
import ProfilePhoto from "../ProfilePhoto";
import { isEmpty } from "../../utils";

const Navbar = () => {
	const { isDarkMode, setIsDarkMode, mode } = useDarkModeStore();
	const { searchUser } = useUsersStore();
	const navigate = useNavigate();
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [anchorElSearch, setAnchorElSearch] = useState(null);

    const onSend = async (email) => {
		handleCloseSearchMenu();
		navigate(`/profile/${email}`);
    }

	const onChangeSearch = (event) => {
		handleOpenSearchMenu(event.target);
		searchUser.fetch(event.target.value);
	}
    const debouncedResults = React.useMemo(() => debounce(onChangeSearch, 300), []);
    React.useEffect(() => () => debouncedResults.cancel());

	const handleOpenSearchMenu = (element) => {
		setAnchorElSearch(element);
	};

	const handleCloseSearchMenu = () => {
		setAnchorElSearch(null);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const settings = [{ name: "Profile", onClick: () => navigate(`/profile/${authStore.userEmail}`) }, { name: "Logout", onClick: () => { authStore.logout(); navigate('/') }  }];

	return (
		<AppBar position="static">
			<Container maxWidth={false}>
				<Toolbar>
					<LetsGoLogo />
					<Box sx={{ flexGrow: 1, maxWidth: '300px', marginLeft: '20px' }}>
						<Search onChange={debouncedResults} />
						<Menu
							sx={{ maxHeight: '300px' }}
							anchorEl={anchorElSearch}
							open={Boolean(anchorElSearch) && !searchUser.isLoading && !isEmpty(searchUser.data)}
							onClose={handleCloseSearchMenu}
						>
							{searchUser.data.map((user) => (
								<MenuItem key={user.email} onClick={() => onSend(user.email)}>
									<Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
										<ProfilePhoto photo={user.profile_photo} />
										<Typography textAlign="center">{user.name}</Typography>
									</Box>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
						<RouterLink to="/">
							<Tooltip title="Home">
									<IconButton
										size="large"
										color="inherit"
									>
										<HomeOutlinedIcon />
									</IconButton>
							</Tooltip>
						</RouterLink>
						<RouterLink to="/map">
							<Tooltip title="Map" >
								<IconButton 
									size="large"
									color="inherit"
								>
									<MapIcon />
								</IconButton>
							</Tooltip>
						</RouterLink>
						<Tooltip title={`${mode} Mode`}>
							<IconButton
								size="large"
								color="inherit"
							>
								{isDarkMode ? (
									<WbSunnyOutlinedIcon onClick={setIsDarkMode} />
								) : (
									<DarkModeOutlinedIcon onClick={setIsDarkMode} />
								)}
							</IconButton>
						</Tooltip>
						<RouterLink to="/chat">
							<Tooltip title="Mail Box" >
								<IconButton 
									size="large"
									color="inherit"
								>
									<MailIcon />
								</IconButton>
							</Tooltip>
						</RouterLink>
						<Tooltip title="My Account">
							<IconButton 
								size="large" 
								onClick={handleOpenUserMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={setting.onClick}>
									<Typography textAlign="center">{setting.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default observer(Navbar);