var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
var connection = null;
var server = ws.createServer(function (conn) {
    console.log("New connection");
    connection = conn;
    conn.on("text", function (str) {

        //conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function (errObj) {
        console.log("Error")
    })
}).listen(8001);

ws.createServer(function (conn) {
    console.log("New connection");

    setTimeout(function () {
        connection.sendText(JSON.stringify({ott:'tryue'}));
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
}).listen(8002)

console.log("Server run")