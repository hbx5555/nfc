/**
 * Created by andreyna on 3/28/2017.
 */
import {config, events} from '../config';
import KCLSingleton from '../base/kcl_singleton';
import RestClient from 'another-rest-client';
import PubSub from 'pubsub-js';


class CommunicationService extends KCLSingleton {

    _restClient = null;
    _webSocketClient = null;
    _subscribers = [];

    constructor() {
        super();
        this._initCommunicationClients();
    }

    _initCommunicationClients() {
        this._restClient = new RestClient(this._createUrl(config.endpoints.restServer));
        this._restClient.res(config.endpoints.restServer.apiCalls.login.path); //login

        // //this._restClient = new RestClient('https://httpbin.org');
        // this._restClient.res('get');
        // Object.keys(config.endpoints.restServer.apiCalls).forEach((key) => {
        //     this._restClient.res(config.endpoints.localProxy.apiCalls[key]); //getUUID
        // });

        //this._initWebSocketClient();
    }

    openWebSocketClient(channel) {
        //this._webSocketClient = new WebSocket(this._createUrl(config.endpoints.remoteSocket) + '/' + channel);
        this._webSocketClient = new WebSocket(this._createUrl(config.endpoints.remoteSocket));
        this._webSocketClient.onopen = this._onWSOpen.bind(this);
        this._webSocketClient.onmessage = this._onWSMessage.bind(this);
        this._webSocketClient.onerror = this._onWSError.bind(this);
        this._webSocketClient.onclose = this._onWSClose.bind(this);
    }

    _onWSOpen() {
        PubSub.publish(events.WS_CONNECTED);
        console.log('WS connection established');
    }

    _onWSMessage(evt) {

        console.log('WS received message');
    }

    _onWSError(error) {
        PubSub.publish(events.WS_FAILED);
        console.log('WS error');
    }

    _onWSClose() {
        console.log('WS close connection');
    }


    login(clientId) {
        return this._restClient.login.get({clientId: clientId});
    }

    getUUID() {
        return this._restClient[config.endpoints.localProxy.apiCalls.getUUID].get()
       // return this._restClient.get.get()
    }

    subscribeToKCLServer(subscriber) {
        this._subscribers.push(subscriber);
    }

    _createUrl(endpoint) {
        return endpoint.protocol + '://' + endpoint.host + ':' + endpoint.port;
    }

    initCommunication() {
        this._initCommunicationClients();
    }
}

export default CommunicationService;