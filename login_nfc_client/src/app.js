/**
 * Created by andreyna on 3/26/2017.
 */
import LoginManager from './services/login_manager';
import {KCLConfig} from './config';
import PubSub from 'pubsub-js';
import {events} from './kcl_consts';
import CommunicationService from './services/communication_service';

class APP {

    _components = {};
    constructor() {
    }

    startApp() {
        this._subscribe();
    }


    _subscribe() {

        KCLConfig.instance.initConfig();

        PubSub.subscribe(events.CONFIG_ON_INIT, () => {
            CommunicationService.instance.init();
            LoginManager.instance.startLogin();
        });
    }

}

export default APP;