/**
 * Created by andreyna on 3/28/2017.
 */
import {KCLConfig} from '../config';
import {events,errors} from '../kcl_consts'
import KCLSingleton from '../base/kcl_singleton';
import RestClient from 'another-rest-client';
import PubSub from 'pubsub-js';
import $ from 'jquery';
import Stomp from 'stompjs';



class CommunicationService extends KCLSingleton {

    _restClient = null;
    _webSocketClient = null;
    _subscribers = [];

    constructor() {
        super();
        //this._initCommunicationClients();
    }



    init() {
        let restConfig = KCLConfig.instance.getConfig().endpoints.restServer;
        let restClient = new RestClient(this._createUrl(restConfig));
        this._api = {};
        Object.keys(restConfig.apiCalls).forEach((key) => {
            let apiCall = restConfig.apiCalls[key];
            restClient.res(restConfig.apiRoot).res(apiCall.path);
            this._api[key] = restClient.api[apiCall.path][apiCall.method];
        });
    }


    loadStaticFile(url) {
        return new Promise((res, rej) => {
            $.getJSON('kcl_config.json')
                .done((data) => {
                    res(data);
                })
                .fail((err) => {
                    rej(err);
                })
        });

    }

    openWebSocketClient(channel) {
        if (KCLConfig.instance.getConfig().endpoints.remoteSocket.type === 'stomp') {
            this.openWebSocketClientStomp(channel);
        } else {
            //DEPRICATED
            this._webSocketClient = new WebSocket(this._createUrl(config.endpoints.remoteSocket) + '/' + channel);
            this._webSocketClient.onopen = this._onWSOpen.bind(this);
            this._webSocketClient.onmessage = this._onWSMessage.bind(this);
            this._webSocketClient.onerror = this._onWSError.bind(this);
            this._webSocketClient.onclose = this._onWSClose.bind(this);
        }
    }

    openWebSocketClientStomp(channel) {
        let wsConfig = KCLConfig.instance.getConfig().endpoints.remoteSocket;
        this._stompClient = Stomp.client(wsConfig.url);
        this._stompClient.connect({},() => {
            this._stompClient.subscribe(channel, this._onWSMessage.bind(this));
            PubSub.publish(events.WS_CONNECTED);
        }, this._onWSError.bind(this));


    }

    _onWSOpen() {
        PubSub.publish(events.WS_CONNECTED);
        console.log('WS connection established');
    }

    _onWSMessage(msg) {
        console.log('WS received message');
        let data = JSON.parse(msg.data || msg.body);
        PubSub.publish(events.WS_MESSAGE_RECEIVED, data);
    }

    _onWSError(error) {
        PubSub.publish(events.WS_FAILED);
        console.log('WS error');
    }

    _onWSClose() {
        console.log('WS close connection');
    }


    getChannel(clientId) {
    //    let apiCall = config.endpoints.restServer.apiCalls['channel'];
  //      this._restApi.res(config.endpoints.restServer.apiCalls['channel'].path);
//        return this._restClient.api[apiCall.path].get({clientId: clientId});
        return this._api.channel({clientId: clientId}, 'application/x-www-form-urlencoded');
    }

    auth(ott) {
        return this._api.auth({ott: ott}, 'application/x-www-form-urlencoded');
    }


    /**
     *
     * @param message
     */
    sendMessage(message) {
        this._webSocketClient(JSON.stringify(message));
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