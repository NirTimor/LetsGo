import React from "react";
import { observer } from "mobx-react";
import { Box, colors } from "@mui/material";
import Typography from "./Typography";
import { useDarkModeStore } from "../stores/darkModeStore";
import ProfilePhoto from "./ProfilePhoto";
import { border } from "../utils";

export const Divider = () => (
    <Box sx={{
        borderBottom: border,
        width: '100%'
    }} />
)

const ChatListItem = ({ name, lastMsg, photo, isSelected, onClick, email }) => {
    const { isDarkMode } = useDarkModeStore();
    const backgroundSelectedColor = isSelected ? (isDarkMode ? colors.grey[800] : colors.grey[200]) : 'transparent';
    const backgroundHoverColor = isDarkMode ? colors.grey[700] : colors.grey[100];

    return (
        <Box 
            onClick={() => onClick(email)}
            sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '10px 5px',
                borderRadius: '3px',
                transition: 'all 0.3s',
                backgroundColor: backgroundSelectedColor,
                '&:hover': {
                    backgroundColor: backgroundHoverColor
                },
            }}
        >
            <ProfilePhoto size="large" photo={photo} />
            <Box sx={{

            }}>
                <Typography variant="body2">{name || email}</Typography>
                <Typography variant="body2" sx={{ fontSize: '12px' }} type="secondary">{lastMsg.length < 17 ? lastMsg : lastMsg.substring(0, 17) + '...'}</Typography>
            </Box>
        </Box>
    )
}

export default observer(ChatListItem);


