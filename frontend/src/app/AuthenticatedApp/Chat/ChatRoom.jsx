import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { Box, colors, InputAdornment, IconButton, Skeleton } from "@mui/material";
import { Send } from "@mui/icons-material";
import Typography from "../../../components/Typography";
import { Async, border, isEmpty } from "../../../utils";
import { useDarkModeStore } from "../../../stores/darkModeStore";
import InputField from "../../../components/inputs/InputField";
import { useChatStore } from "../../../stores/chatStore";
import NoDataImage from '../../../assets/noDataChatComponent.png';
import ProfilePhoto from "../../../components/ProfilePhoto";

const TopSection = ({ name, photo }) => (
    <Box sx={{
        borderBottom: border,
    }}>
        <Box sx={{
            padding: '10px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
        }}>
            <ProfilePhoto size="large" photo={photo} />
            <Typography variant="body1">{name}</Typography>
        </Box>
    </Box>
);

const Message = ({ message, date, time, isMine }) => {
    const { isDarkMode } = useDarkModeStore();

    return (
        <Box sx={{
            alignSelf: isMine ? 'flex-start' : 'flex-end',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
        }}>
            <Typography variant="body2" type="secondary" sx={{ textAlign: isMine ? 'left' : 'right' }}>{time}, {date}</Typography>
            <Box sx={{
                backgroundColor: isMine ? (isDarkMode ? colors.blue[700] : colors.blue[100]) : (isDarkMode ? colors.grey[700] : colors.grey[100]),
                padding: '10px',
                width: '200px',
                borderRadius: '5px'
            }}> 
                <Typography variant="body2" sx={{ overflowWrap: 'anywhere' }}>{message}</Typography>
            </Box>
        </Box>
    )
}

const ChatInput = () => {
    const { sendMessage, allChats } = useChatStore();
    const [messageValue, setMessageValue] = useState(null);
    const onSend = async () => {
        setMessageValue('');
        await sendMessage.fetch(messageValue);
        allChats.fetch();
    }

    return (
        <Box sx={{ margin: '10px' }}>
            <InputField
                id="chat-input"
                label="Enter text here..."
                multiline
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                InputProps={{ 
                    endAdornment:
                    <InputAdornment position="end">
                        <IconButton onClick={onSend}>
                            <Send />
                        </IconButton>
                    </InputAdornment>
                }}
            />
        </Box>
    )
};

const MainSection = observer(() => {
    const { openChatMessages } = useChatStore();
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [openChatMessages.data]);

    return (
        <Box sx={{
            position: 'relative',
        }}>
            <Box style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '10px 20px',
                gap: '15px',
                overflow: 'auto',
                position: 'relative',
                height: 'calc(100vh - 252px)'
            }}>
                <Async
                    isLoading={isEmpty(openChatMessages.data)}
                    LoadingComponent={(
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </>
                    )}
                    isNoData={openChatMessages.data[0] === 'empty'}
                    NoDataComponent={null}
                >
                    {openChatMessages.data.map((message) => (
                        <Message message={message.message} date={message.date} time={message.time} isMine={message.isMine} />
                    ))}
                    <div ref={messagesEndRef} />
                </Async>
            </Box>
            <ChatInput />
        </Box>
    )
})

const ChatRoom = () => {
    const { openChatUserData } = useChatStore();

    return (
        <Box sx={{
            width: '800px',
        }}>
            <Async
                isNoData={isEmpty(openChatUserData)}
                NoDataComponent={(
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '15px',
                        height: '80%'
                    }}>
                        <img src={NoDataImage} />
                        <Typography>No chat to display</Typography>
                        <Typography variant="body2" type="secondary">Start chatting by choose user from the list or search for a user to start a new conversation</Typography>
                    </Box>
                )}
            >
                <TopSection name={openChatUserData?.name} photo={openChatUserData?.profile_photo} />
                <MainSection />
            </Async>
        </Box>
    )
}

export default observer(ChatRoom);
