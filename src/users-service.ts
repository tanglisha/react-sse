import React from 'react';
import {User, ID} from './user';
import {Observable, of} from 'rxjs';
import {tap, delay} from 'rxjs/operators';

class UsersService {
    private _users: User[] = [];
    private _activeID: ID = ''

    get users(): User[] { return [...this._users]}
    get activeUser(): User | null { return this.findUserByID(this._activeID); }

    loadUsers(): Observable<User[]> {
        return of(data).pipe(
            delay(300),
            tap(users => this._users = users)
        )
    }
    findUserByID(id:ID): User | null {
        return this.users.reduce((result, it:User) => {
            return result || ((it.id === id) ? it : null);
        },null);
    }

    selectUser(id:ID):User|null {
        const user = this.findUserByID(id);
        this._activeID = !!user ? id : "";
        return user;
    }

    updateUser(newUser:User):User|null{
        let result: User|null = null;
        this._users = this._users.map(it => {
            if (it.id === newUser.id) {
                result = {...it, ...newUser};
                return result;
            }
            return it;
        });
        return result;
    }
}

export const usersService = new UsersService();
