const WebSocket = require('ws');
const options = {
    port:4000,
}
const wss= new WebSocket.Server(options)
const notes = [];
let active;
const redis=require('redis');
const client=redis.createClient();

client.on('message',(channel,message)=>{
    wss.clients.forEach((client)=>{
        if(client.readyState===WebSocket.OPEN){
            const dataToSend = {
                type:'NOTIFICATION',
                 notification:message,
                    };
                    console.log(dataToSend)

            client.send(JSON.stringify(dataToSend));
        }
    })
});
client.subscribe('myPubSubChannel');



const broadcastMessage = (message) =>{
wss.clients.forEach((client)=>{
    if(client.readyState===WebSocket.OPEN){
        client.send(JSON.stringify(message));
    }
})
}
const broadcastNewNote = (id,views) => {
   // notes.push(id);
   // console.log(views)
   active=views+1
    console.log(active)

    
    broadcastMessage({
        type:'UPDATE_COUNT',
        active,
        
    });
};

wss.on('connection',(ws)=>{// ws represents a single connection to a single tab
    //when someone connects , this will be called
    //ws connection stays open the entire time you are on the page
    console.log('someone has connected');
    
    
    //event 2 message   
    ws.on('message',(message)=>{
    console.log(message); //incoming from client
    const messageObject=JSON.parse(message);
    console.log(messageObject)
    switch(messageObject.type){
        case 'UPDATE_COUNT':
            console.log('In n')
            broadcastNewNote(messageObject.id,messageObject.active_users);
            break;
            default:
                console.log('message type not supported');
    }
    });


ws.on('close',()=>{
    console.log('closed');
    
});

ws.on('error',(e)=>{
})
})