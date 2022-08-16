import BaseApi from './BaseApi'

interface IChatApiCreate {
    title: string
}

interface IChatApiAddUser {
    users: number []
    chatId: number
}

class ChatApi extends BaseApi {
    constructor() {
        super({ path: '/chats' });
    }

    public create(data: IChatApiCreate) {
        return this.post('/', {
            withCredentials: true,
            data: JSON.stringify(data),
        });
    }

    public request() {
        return this.get('/', {
            withCredentials: true,
        });
    }


    public addUserChat(data: IChatApiAddUser) {
        return this.put('/users', {
            withCredentials: true,
            data: JSON.stringify(data),
        })
    }

    public deleteUserChat(data: IChatApiAddUser) {
        return this.delete('/users', {
            withCredentials: true,
            data: JSON.stringify(data),
        })
    }

    public removeChat(chatId: number) {
        return this.delete('/', {
            withCredentials: true,
            data: JSON.stringify({ chatId }),
        })
    }

    public requestMessageToken(chatId: number) {
        return this.post(`/token/${chatId}`, {
            withCredentials: true,
        })
    }

    public requestChatUsers(chatId: number) {
        return this.get(`/${chatId}/users`, {
            withCredentials: true,
        })
    }
}

export default new ChatApi()
