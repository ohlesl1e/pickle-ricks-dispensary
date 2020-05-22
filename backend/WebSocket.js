const WebSocket = require('ws');
const options = {
    port:4000,
}
const wss= new WebSocket.Server(options)
let itemViews = {};


const broadcastMessage = (message) =>{
wss.clients.forEach((client)=>{
    if(client.readyState===WebSocket.OPEN){
        client.send(JSON.stringify(message));
    }
})
}
const broadcastNewNote = (id) => {
   // notes.push(id);
   // console.log(views)

    
    broadcastMessage({
        type:'UPDATE_COUNT',
        id,       
    });
};

wss.on('connection',(ws)=>{// ws represents a single connection to a single tab
    //when someone connects , this will be called
    //ws connection stays open the entire time you are on the page
    console.log('someone has connected');
    
    
    //event 2 message   
    ws.on('message',(message)=>{
    const messageObject=JSON.parse(message);
    switch(messageObject.type){
        case 'UPDATE_COUNT':
            
            if(itemViews.hasOwnProperty(messageObject.id)){
                itemViews[messageObject.id] += 1;
            } else {
                itemViews[messageObject.id] = 1;
            }
            messageObject.views = itemViews[messageObject.id];
            console.log(messageObject);
            broadcastNewNote(messageObject);
            break;
        case 'DECREASE_COUNT':
            
            if(itemViews.hasOwnProperty(messageObject.id)){
                itemViews[messageObject.id] -= 1;
            }
            messageObject.views = itemViews[messageObject.id];
            broadcastMessage(messageObject);
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