/**
 * Created by andreyna on 3/26/2017.
 */
import KCLSingleton from './base/kcl_singleton'
import CommunicationService from './services/communication_service';
import PubSub from 'pubsub-js';
import {events} from './kcl_consts';


const defaultConfig  = {
    "mode": "debug",
    "endpoints": {
        "restServer": {
            "url": "http://localhost:57577/api",
            "protocol": "http",
            "host": "localhost",
            "port": "57577",
            "apiRoot": "api",
            "apiCalls": {
                "channel": {
                    "path": "login",
                    "method": "get"
                },
                "auth": {
                    "path": "login",
                    "method": "post"
                }
            }

        },
        "remoteSocket": {
            "url": "ws://localhost:8125/stomp",
            "type": "stomp",
            "protocol": "ws",
            "host": "localhost",
            "port": "8001",
            "apiRoot": "stomp"
        }
    }
}

class KCLConfig extends KCLSingleton{
    constructor() {
        super();
        //this._initConfig();
    }

    initConfig() {
        //if we are in debug mode, then load external config file
        if (defaultConfig.mode === 'debug') {
            CommunicationService.instance.loadStaticFile('kcl_config.json')
                .then((res) => {
                    console.log(res);
                    PubSub.publish(events.CONFIG_ON_INIT);
                    this._config = Object.assign({}, defaultConfig, res);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            PubSub.publish(events.CONFIG_ON_INIT);
        }
    }

    updateConfig(config) {
        debugger;
        this._config = Object.assign({}, this._config, config);
    }

    getConfig() {
        return this._config;
    }
}


export {KCLConfig};