import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { Box } from "@mui/material";
import { useChatStore } from "../../../stores/chatStore";
import Page from "../Page";
import UsersList from "./UsersList";
import ChatRoom from "./ChatRoom";
import { border } from "../../../utils";

const Chat = () => {
    const { allChats, openChatMessages, reset } = useChatStore();
    useEffect(() => {
        allChats.fetch();
        openChatMessages.poll.init();
        return reset;
    }, [])

    return (
        <Page>
            <Box sx={{
                display: 'flex',
                border,
                borderRadius: '4px',
                height: 'calc(100vh - 100px)',
                backgroundColor: 'background.paper'
            }}>
                <UsersList />
                <ChatRoom />
            </Box>
        </Page>
    )
}

export default observer(Chat);
