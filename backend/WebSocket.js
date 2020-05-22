const WebSocket = require('ws');
const options = {
    port:4000,
}
const wss= new WebSocket.Server(options)

const broadcastMessage = (message) =>{
wss.clients.forEach((client)=>{
    if(client.readyState===WebSocket.OPEN){
        client.send(JSON.stringify(message));
    }
})
}
const updateUserCount =()=>{
    broadcastMessage({
        count:wss.clients.size,
    })
}

wss.on('connection',(ws)=>{
    console.log('yep, connected doggie');
    updateUserCount();


ws.on('close',()=>{
    console.log('closed');
    updateUserCount();
});

ws.on('error',(e)=>{
})
})