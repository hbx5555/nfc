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
import SockJS from 'sockjs-client';



class CommunicationService extends KCLSingleton {

    _restClient = null;
    _webSocketClient = null;
    _subscribers = [];

    constructor() {
        super();
        //this._initCommunicationClients();
    }

    initRestClient() {
        let restConfig = KCLConfig.instance.getConfig().endpoints.restServer;
        let restClient = new RestClient(this._createUrl(restConfig));
        let apiPath = this._getPathParams(restConfig.apiRoot);
        let rootResource = null;
        this._api = {};
        apiPath.forEach((path) => {
            if (rootResource) {
                rootResource = rootResource.res(path);
            } else {
                rootResource = restClient.res(path);
            }
        });


        Object.keys(restConfig.apiCalls).forEach((key) => {
            let apiCall = restConfig.apiCalls[key];
            rootResource.res(apiCall.path);
            //this._api[key] = restClient[].[apiCall.path][apiCall.method];
            this._api[key] = rootResource[apiCall.path][apiCall.method];
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

    _getUrlParser(url) {
        var parser = document.createElement('a');
        parser.href = url;
        return parser;
    }

    _getPathParams(parser) {
        let pathNames = parser.split('/');
        return pathNames.filter((name) => {
            return "" !== name;
        });
    }

    openWebSocketClient(channel) {
        let wsConfig = KCLConfig.instance.getConfig().endpoints.remoteSocket;
        this._webSocketClient = new WebSocket(this._createFullURL(wsConfig) + '?channel=' + channel + '&client=web');
        this._webSocketClient.onopen = this._onWSOpen.bind(this);
        this._webSocketClient.onmessage = this._onWSMessage.bind(this);
        this._webSocketClient.onerror = this._onWSError.bind(this);
        this._webSocketClient.onclose = this._onWSClose.bind(this);
    }

    // openWebSocketClientStomp(channel) {
    //     let wsConfig = KCLConfig.instance.getConfig().endpoints.remoteSocket;
    //     var socket = new SockJS(this._createFullURL(wsConfig) + '?channel=' + channel + '&client=web');
    //     this._stompClient = Stomp.over(socket);
    //     // this._stompClient = Stomp.client(wsConfig.url + '?channel=' + channel + '&client=web');
    //     this._stompClient.connect({},() => {
    //         this._stompClient.subscribe('/user/queue/msg/web', this._onWSMessage.bind(this));
    //         PubSub.publish(events.WS_CONNECTED);
    //     }, this._onWSError.bind(this));
    // }

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


    getChannel(domainKey) {
        return this._api.channel({domainKey: domainKey}, 'application/x-www-form-urlencoded');
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

    _createFullURL(endpoint) {
        let url = this._createUrl(endpoint);
        let paths = this._getPathParams(endpoint.apiRoot);
        paths.forEach((p) => {
            url += '/';
            url += p;;
        });

        return url;
    }

    _createUrlFromParser(urlParser) {
        return urlParser.protocol + '//' + urlParser.host;
    }

    initCommunication() {
        this._initCommunicationClients();
    }
}

export default CommunicationService;