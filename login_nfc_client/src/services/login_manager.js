/**
 * Created by andreyna on 3/26/2017.
 */
import CommunicationService from './communication_service';
import KCLSingleton from '../base/kcl_singleton';
import QueryStringParser from 'query-string-parser';
import {selectors, events} from '../kcl_consts';
import PubSub from 'pubsub-js';
import LoginController from '../components/login_controller';
import PostMessageService from './post_message_service';

class LoginManager extends KCLSingleton {

    _pin;
    _channelID;
    _clientId;
    _userId;
    _ott;
    _loginController;
    _isDebugMode;

    constructor() {
      super();

    }


    startLogin() {
        this._subscribe();
        this._loginController = new LoginController();
        this._loginController.start(selectors.uiContainer);
        let isValidParams = this._parseQueryParams();
        if (false === isValidParams) {
            this._loginController.handleError('Invalid query parameters');
            window.parent.postMessage({actionId: 'error', postData: {code:1}}, '*');
            return;
        }

        if (this._userId) {
            console.debug('Start registration new domain for user ' + this._userId);
            this._loginController.showLoading(true, 'Sending site registration request');
            this._getReqisterChannelID(this._clientId, this._userId)
                .then((res) => {
                    this._loginController.showLoading(false);
                    this._handleChannelIDResponse(res);
                })
                .catch((error) => {
                    console.log(error);
                    console.log('LoginManager - failed to retrieve requestId');
                    this._loginController.showLoading(false);
                    this._loginController.handleError('Failed to retrieve requestId');
                    PostMessageService.instance.sendPostMessage({actionId: 'error', postData: {code:2}});
                })
        } else {
            console.debug('Start login process to domain ' + this._clientId);
            this._loginController.showLoading(true, 'Sending login request...');
            this._getLoginChannelID(this._clientId)
                .then((res) => {
                    this._loginController.showLoading(false);
                    this._handleChannelIDResponse(res);
                })
                .catch((error) => {
                    console.log(error);
                    console.log('LoginManager - failed to retrieve requestId');
                    this._loginController.showLoading(false);
                    this._loginController.handleError('Failed to retrieve requestId');
                    PostMessageService.instance.sendPostMessage({actionId: 'error', postData: {code:2}});
                })
        }
    }

    _getLoginChannelID(clientId) {
        return CommunicationService.instance.getChannel(clientId)
    }


    _getReqisterChannelID(clientId, userId) {
        return CommunicationService.instance.getRegistartionChannel(clientId, userId);
    }


    _handleChannelIDResponse(res) {
        this._channelID = res.channel;
        this._pin = res.pin;
        window.parent.postMessage({actionId: 'channel', postData: res}, '*');
        CommunicationService.instance.openWebSocketClient(this._channelID);
    }


    /**
     * Parse query params and validate that all params for auth request are defined
     * @private
     */
    _parseQueryParams() {
        let isValid = false;
        let qs = QueryStringParser.fromQuery(window.location.search.slice(1));
        if (qs && qs.clientId) {
            this._clientId = qs.clientId;
            isValid = true;
        }

        //check if it's new site registration
        if (isValid && qs.userId) {
            this._userId = qs.userId;
        }

        return isValid;
    }


    _subscribe(){
        PubSub.subscribe(events.WS_FAILED, () => {
            this._loginController.handleError('Failed to open web socket');
            PostMessageService.instance.sendPostMessage({actionId: 'error', postData: {code:4}});
        });
        PubSub.subscribe(events.WS_CONNECTED, () => {
            console.log('LogginManager onconnected to WS');
            this._loginController.displayCardPass('Please pass your card...', this._pin);
        });
        PubSub.subscribe(events.WS_MESSAGE_RECEIVED, (msg, data) => {
            //one time token
            this._ott = data.ott;
            this._loginController.showLoading(true, 'OTT Received, sending Authentication request...');

            CommunicationService.instance.auth(this._ott)
                .then((res) => {
                    this._loginController.showLoading(false);
                    console.log(res);
                    PostMessageService.instance.sendPostMessage({actionId: 'success', postData: res});
                })
                .catch((error) => {
                    console.log('LoginManager - failed to retrieve access token');
                    this._loginController.showLoading(false);
                    this._loginController.handleError('Failed to retrieve requestId');
                    PostMessageService.instance.sendPostMessage({actionId: 'error', postData: {code:3}});
                })
            //TODO close WS
        });
    }
    
    
    sendRequest() {
       
    }
}

export default LoginManager;