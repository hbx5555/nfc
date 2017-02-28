var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        setTimeout(function (str) {
            console.log("Timeout run " + str);
            var obj = JSON.parse(str);
            conn.sendText(JSON.stringify({account:obj.message, status: 'excepted'}));
        }, 2000, str);
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