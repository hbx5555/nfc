/**
 * Created by Andrey on 4/24/2017.
 */
const events = {
    APPLICATION_ON_INIT: 'APPLICATION_ON_INIT',
    CONFIG_ON_INIT: 'CONFIG_ON_INIT',
    WS_CONNECTED: 'WS_CONNECTED',
    WS_FAILED: 'WS_FAILED',
    WS_MESSAGE_RECEIVED: 'WS_MESSAGE_RECEIVED',
    INVALID_REQUEST: 'INVALID_REQUEST'
}

const errors = {
    COMMUNICATION_FAILED: 100
}

const selectors = {
    uiContainer: '.app-container',
    kcpTokenName: 'kcp_token'
}

export {events, errors, selectors}