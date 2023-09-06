import React, { useState } from "react";
import { observer } from "mobx-react";
import { debounce } from "lodash";
import { Box, Skeleton, MenuItem, Menu } from "@mui/material";
import { Async, border, isEmpty } from "../../../utils";
import Search from "../../../components/inputs/Search";
import Typography from "../../../components/Typography";
import { useChatStore } from "../../../stores/chatStore";
import ChatListItem, { Divider } from "../../../components/ChatListItem";
import usersStore, { useUsersStore } from "../../../stores/usersStore";
import ProfilePhoto from "../../../components/ProfilePhoto";

const UsersList = () => {
    const { sideList, allChats, setOpenChatEmail, openChatMessages, openChatEmail, searchUser } = useChatStore();
    const { fetchUser } = useUsersStore();
    const [anchorElSearch, setAnchorElSearch] = useState(null);

    const onSend = async (email) => {
        await fetchUser(email)
        handleCloseSearchMenu();
		setOpenChatEmail(email);
    }

	const onChangeSearch = async (event) => {
        await searchUser.fetch(event.target.value);
		handleOpenSearchMenu(event.target);
	}
    const debouncedResults = React.useMemo(() => debounce(onChangeSearch, 300), []);
    React.useEffect(() => () => debouncedResults.cancel());

    const openChat = (email) => {
        openChatMessages.setData([]);
        setOpenChatEmail(email);
        usersStore.fetchUser(email);
    }

    const handleOpenSearchMenu = (element) => {
		setAnchorElSearch(element);
	};

	const handleCloseSearchMenu = () => {
		setAnchorElSearch(null);
	};

    return (
        <Box sx={{
            borderRight: border,
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            width: '270px'
        }}>
            <Box sx={{
                color: 'text.primary',
                height: 'fit-content',
            }}>
                <Search onChange={debouncedResults} isLoading={searchUser.isLoading} />
                <Menu
                    sx={{ maxHeight: '300px' }}
                    anchorEl={anchorElSearch}
                    open={Boolean(anchorElSearch)}
                    onClose={handleCloseSearchMenu}
                >
                    <Async
                        isNoData={isEmpty(searchUser.data)}
                        NoDataComponent={(
                            <MenuItem>
                                <Typography textAlign="center">No data</Typography>
                            </MenuItem>
                        )}
                    >
                        {searchUser.data.map((user) => (
                            <MenuItem key={user.email} onClick={() => onSend(user.email)}>
                                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <ProfilePhoto photo={user.profile_photo} />
                                    <Typography textAlign="center">{user.name}</Typography>
                                </Box>
                            </MenuItem>
                        ))}
                    </Async>
                </Menu>
            </Box>
            <Async
                isLoading={allChats.isLoading && isEmpty(sideList)}
                LoadingComponent={<Skeleton />}
                isNoData={isEmpty(sideList)}
                NoDataComponent={(
                    <Typography variant="body2" type="secondary" sx={{ textAlign: 'center', marginTop: '10px' }}>No chat list, try to open a new chat by searching user name</Typography>
                )}
            >
                {sideList.map((user) => (
                    <>
                        <ChatListItem name={user.name} email={user.email} lastMsg={user.lastMessage} photo={user.photo} onClick={openChat} isSelected={openChatEmail === user.email} />
                        <Divider />
                    </>
                ))}
            </Async>
        </Box>
    )
}

export default observer(UsersList);
