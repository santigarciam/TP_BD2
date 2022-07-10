import { Injectable, Scope } from '@nestjs/common';
import { User } from '../users/users.entity';

@Injectable({ scope: Scope.REQUEST }) // Cada  request que llegue al sistema va a tener un requestservice --> Es request safe
export class RequestService {

    private user: User;
    private userToken: string;

    setUser(user: User) {
        this.user = user;
    }

    setUserToken(userToken: string) {
        this.userToken = userToken;
    }

    getUserToken() {
        return this.userToken;
    }

    getUser() {
        return this.user;
    }

}
