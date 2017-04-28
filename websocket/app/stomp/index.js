var http = require("http");
var StompServer = require('stomp-broker-js');


var server = http.createServer();
var stompServer = new StompServer({server: server, debug: (arg1, arg2, arg3) => {
    console.log(arg1 + ' ' + arg2 + ' ' + arg3);
}});

server.listen(8125, () => {
    console.log('server bound');
});

stompServer.subscribe("/test.data", function(msg, headers) {
    var topic = headers.destination;
    console.log(topic, "->", msg);
});

stompServer.on('connected', (sessionId) => {
    console.log(sessionId);
    //stompServer.send('/**', {}, {ott: '45765829'});

});


var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");

    conn.on("text", function (str) {
        console.log(str);
        //str = channel id
        stompServer.send(str, {}, JSON.stringify({ott: '45765829'}));
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function (errObj) {
        console.log("Error")
    })
}).listen(8001)

console.log("Server run")

