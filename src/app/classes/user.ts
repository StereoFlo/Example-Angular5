import {UserInterface} from '../interfeces/user-interface';

export class User implements UserInterface {
    private _apiToken: { key: string };
    private _email: string;
    private _roles: { list: [string] };
    private _userId: string;
    private _username: string;

    constructor(values: Object = {}) {
        if (values) {
            Object.assign(this, values);
        }
    }


    get apiToken(): { key: string } {
        return this._apiToken;
    }

    get email(): string {
        return this._email;
    }

    get roles(): { list: [string] } {
        return this._roles;
    }

    get userId(): string {
        return this._userId;
    }

    get username(): string {
        return this._username;
    }
}