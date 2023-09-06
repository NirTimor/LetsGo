import React from 'react';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react';
import { Box, colors } from '@mui/material';
import Typography, { Link, RouterLink } from '../Typography';
import ChatListItem, { Divider } from '../ChatListItem';
import routesStore from '../../stores/routesStore';
import { useChatStore } from '../../stores/chatStore';
import { Async, isEmpty } from '../../utils';

const ChatSection = () => {
    const { sideList, setOpenChatEmail } = useChatStore();
    const navigate = useNavigate();

    const onChatClick = (email) => {
        navigate(routesStore.authorizedRoutes.chat.path);
        setOpenChatEmail(email);
    }

    return (
        <Box sx={{
            width: '220px',
            padding: '20px',
            height: 'fit-content',
            border: `1px solid ${colors.grey[300]}`,
            borderRadius: '4px',
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Typography 
                variant="body1" 
                sx={{
                    fontWeight: 700,
                    borderBottom: `1px solid ${colors.grey[300]}`,
                    paddingBottom: '7px',
                    color: 'text.primary'
                }}
            >
                Last chats:
            </Typography>
            <Async
                isNoData={isEmpty(sideList)}
                NoDataComponent={<Typography variant="body2" type="secondary" sx={{ marginTop: '10px' }}>No chats to display. <Link><RouterLink to={routesStore.authorizedRoutes.chat.path}>Click here</RouterLink></Link> to start a conversation</Typography>}
            >
                {sideList.map((user) => (
                    <>
                        <ChatListItem name={user.name} email={user.email} lastMsg={user.lastMessage} photo={user.photo} onClick={onChatClick} isSelected={false} />
                        <Divider />
                    </>
                ))}
            </Async>
        </Box>
    )
} 

export default observer(ChatSection);
