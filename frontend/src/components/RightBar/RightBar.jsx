import React, { useEffect } from 'react';
import ChatSection from './ChatSection';
import chatStore from '../../stores/chatStore';

const RightBar = () => {
    useEffect(() => {
        chatStore.allChats.fetch();
    }, []);

    return (
        <ChatSection />
    )
};

export default RightBar;
