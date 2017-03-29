/**
 * Created by andreyna on 3/26/2017.
 */
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
        }
    }
}

export {config};