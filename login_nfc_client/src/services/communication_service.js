/**
 * Created by andreyna on 3/28/2017.
 */
import {config} from '../config';
import KCLSingleton from '../base/kcl_singleton';
import RestClient from 'another-rest-client';

class CommunicationService extends KCLSingleton {

    _restClient = null;

    constructor() {
        super();
        this._initCommunicationClients();
    }

    _initCommunicationClients() {
        this._restClient = new RestClient(this._createUrl(config.endpoints.localProxy));
        //this._restClient = new RestClient('https://httpbin.org');
        this._restClient.res('get');
        Object.keys(config.endpoints.localProxy.apiCalls).forEach((key) => {

            this._restClient.res(config.endpoints.localProxy.apiCalls[key]); //getUUID
        });

    }

    getUUID() {
        return this._restClient[config.endpoints.localProxy.apiCalls.getUUID].get()
       // return this._restClient.get.get()
           
    }

    _createUrl(endpoint) {
        return endpoint.protocol + '://' + endpoint.host + ':' + endpoint.port;
    }
}

export default CommunicationService;