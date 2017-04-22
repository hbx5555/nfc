var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");

    setTimeout(function () {
        conn.sendText(JSON.stringify({ott:'tryue'}));
    }, 5000);

    conn.on("text", function (str) {

        //conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function (errObj) {
        console.log("Error")
    })
}).listen(8001)

console.log("Server run")