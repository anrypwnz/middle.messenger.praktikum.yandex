import BaseApi from './BaseApi';

interface IAuthApiSignIn {
    login: string
    password: string
}

export interface IAuthApiSignUp {
    firstName: string
    secondName: string
    login: string
    email: string
    phone: string
    password: string
}

class AuthApi extends BaseApi {
    constructor() {
        super({path: '/auth'})
    }

    public signIn(data: { [p: string]: string }) {
        return this.post('/signin', {
            withCredentials: true,
            data: JSON.stringify(data)
        })
    }

    public signUp(data: { [p: string]: string }) {
        return this.post('/signup', {
            data: JSON.stringify(data),
        });
    }

    public checkAuth() {
        return this.get('/user', {
            withCredentials: true,
        });
    }

    public signOut() {
        return this.post('/logout', {
            withCredentials: true,
        });
    }
}

export default new AuthApi()
