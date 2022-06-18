

export default {
    namespaced: true,
    state: {
        user: null,
        chats: [],
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setChats(state, chats) {
            state.chats = chats;
        },
        pushChat(state, chat) {
            state.chats.push(chat);
        },
        setMessages(state, messages) {
            state.chats = state.chats.map(chat => {
                if (chat.id === messages.chatId) {
                    chat.messages = messages.messages;
                }
                return chat;
            }
            );
        },
        pushMessage(state, message) {
            state.chats = state.chats.map(chat => {
                if (chat.id === message.chatId) {
                    chat.messages.push(message);
                }
                return chat;
            }
            );
        }
    },
    actions: {
        setUser({ commit }, user) {
            commit('setUser', user);
        }
    }
}