/**
 * Created by andreyna on 3/26/2017.
 */
const events = {
    APPLICATION_ON_INIT: 'APPLICATION_ON_INIT',
    WS_CONNECTED: 'WS_CONNECTED',
    WS_FAILED: 'WS_FAILED',
    INVALID_REQUEST: 'INVALID_REQUEST'
}

const errors = {
    COMMUNICATION_FAILED: 100
}

const config = {
    kcpTokenName: 'kcp_token',
    endpoints: {
        localProxy: {
            protocol: 'http',
            host: 'localhost',
            port: '8888',
            apiCalls: {
                getUUID: 'uuid'
            }
        },
        remoteSocket: {
            protocol: 'ws',
            host: 'localhost',
            port: '8001',
            apiCalls: {
                auth: ''
            }
        }
    }
}

export {config, events, errors};