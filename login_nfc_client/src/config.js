/**
 * Created by andreyna on 3/26/2017.
 */
import KCLConfig from 'external!./kcl_config';

const events = {
    APPLICATION_ON_INIT: 'APPLICATION_ON_INIT',
    WS_CONNECTED: 'WS_CONNECTED',
    WS_FAILED: 'WS_FAILED',
    WS_MESSAGE_RECEIVED: 'WS_MESSAGE_RECEIVED',
    INVALID_REQUEST: 'INVALID_REQUEST'
}

const errors = {
    COMMUNICATION_FAILED: 100
}

const config = {
    uiContainer: '.app-container',
    kcpTokenName: 'kcp_token',
    endpoints: KCLConfig.endpoints
}

export {config, events, errors, KCLConfig};