import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import {WebSocketService} from '../services/websocket.service';

const LOGIN_URL = 'ws://localhost:8001';

export interface Message {
    author: string;
    message: any;
}

@Injectable()
export class LoginService {
    public messages: Subject<Message>;

    constructor(wsService: WebSocketService) {

        this.messages = <Subject<Message>>wsService
            .connect(LOGIN_URL)
            .map((response: MessageEvent): Message => {
                let data = JSON.parse(response.data);

                return {
                    author: data.author,
                    message: {account: data.account, status: data.status}
                }
            });
    }
}