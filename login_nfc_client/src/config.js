/**
 * Created by andreyna on 3/26/2017.
 */
// class KCLConfig {
//
//     constructor() {
//
//     }
// }
//
// export default new KCLConfig();

const config = {
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