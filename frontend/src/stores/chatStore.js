import React from 'react';
import dayjs from 'dayjs';
import { observable, action, computed, makeObservable } from 'mobx';
import { fetchAllChats, fetchChatByEmails, sendMessage } from '../api/chatApi';
import FetchStore from './FetchStore';
import authStore from './authStore';
import { getFormattedDate } from '../utils';
import usersStore from './usersStore';

class ChatStore {
    constructor() {
        this.openChatEmail = null;

        makeObservable(this, {
            openChatEmail: observable,
            sideList: computed,
            setOpenChatEmail: action,
            reset: action,
        });
    }

    allChats = new FetchStore({
        id: 'all-chat',
        fetchApi: () => fetchAllChats(),
        parseResponse: (response) => {
            const result = {};
            response.data.forEach((chat) => {
                const secondUser = chat.email_user1 === authStore.userEmail ? chat.email_user2 : chat.email_user1;
                result[secondUser] = chat;
            })
            return result;
        },
        onSuccess: ({ response }) => {
            response.data.forEach((chat) => {
                const secondUser = chat.email_user1 === authStore.userEmail ? chat.email_user2 : chat.email_user1;
                usersStore.fetchUser(secondUser);
            })
        }
    })

    openChatMessages = new FetchStore({
        id: 'chat-by-emails',
        data: [],
        polling: { enabled: true, interval: 2000, pollOnFail: true, },
        fetchApi: () => fetchChatByEmails(this.openChatEmail),
        parseResponse: (response) => response.data.messages.map((message) => ({
            date: message.date,
            time: message.time,
            message: message.message,
            isMine: message.sender_email === authStore.userEmail,
        })),
        onFail: () => {
            this.openChatMessages.setData(['empty']);
        }
    })

    sendMessage = new FetchStore({
        id: 'send-message',
        fetchApi: (message) => sendMessage({ message, receiverEmail: this.openChatEmail }),
        onSuccess: ({ params }) => {
            const message = params[0];
            this.openChatMessages.setData([...this.openChatMessages.data, {
                date: getFormattedDate(dayjs()),
                time: dayjs().format('hh:mm'),
                message: message,
                isMine: true,
            }])
        }
    })

    setOpenChatEmail = (email) => {
        this.openChatEmail = email;
    }

    reset = () => {
        this.openChatEmail = null;
        this.openChatMessages.reset();
        this.allChats.reset();
        this.openChatMessages.poll.abort();
    }

    get sideList() {
        return Object.entries(this.allChats.data).map(([key, value]) => ({ email: key, lastMessage: value.messages.at(-1).message, name: usersStore.getName(key), photo: usersStore.getProfilePhoto(key) }));
    }

    get openChatUserData() {
        return usersStore.usersData.get(this.openChatEmail);
    }
}

const chatStore = new ChatStore();
const chatContext = React.createContext(chatStore);
export const useChatStore = () => React.useContext(chatContext);
export default chatStore;
