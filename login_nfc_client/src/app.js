/**
 * Created by andreyna on 3/26/2017.
 */
import LoginManager from './services/login_manager';
import {KCLConfig} from './config';
import PubSub from 'pubsub-js';
import {events} from './kcl_consts';
import CommunicationService from './services/communication_service';

class APP {

    _appInit = false;
    constructor() {

    }


    subscribe(event, callback) {
        PubSub.subscribe(event, callback)
    }

    initApp() {
        this._subscribe();
        KCLConfig.instance.initConfig();
    }


    login() {
        if (this._appInit) {
            LoginManager.instance.startLogin();
        } else {
            console.log('Application is not initialized. Please call in "APPLICATION_ON_INIT" event callback!');
        }
    }

    debug() {
        return {
            getChannel: LoginManager.instance._getLoginChannelID.bind(LoginManager.instance),
            getConfig: KCLConfig.instance.getConfig.bind(KCLConfig.instance),
            openSocket: CommunicationService.instance.openWebSocketClient.bind(CommunicationService.instance),
            auth: CommunicationService.instance.auth.bind(CommunicationService.instance)
        }
    }


    _subscribe() {
        PubSub.subscribe(events.CONFIG_ON_INIT, () => {
            this._appInit = true;
            CommunicationService.instance.init();
            PubSub.publish(events.APPLICATION_ON_INIT);
        });
    }

}

export default APP;