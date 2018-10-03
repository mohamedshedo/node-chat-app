let socket =io();
socket.on('connect',function(){
    console.log('connected to server');
});
socket.on('disconnect',function(){
    console.log('disconnected');
});
socket.on('newMessage',function(newMessage){
    console.log(newMessage);
    let li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);
    jQuery('#messages').append(li);
});


jQuery("#message-form").on('submit',function(e){
  
    socket.emit('createMessage',{
      from:'User',
      text:jQuery('[name=message]').val()  
    },function(){
        
    });
return false;
});