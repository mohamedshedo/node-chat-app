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

socket.on('newLocationMessage',function(message){
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank"> mycurrent location </a>');

    li.text(`${message.from}`);
    a.attr('href',message.url);

    li.append(a);
    jQuery('#messages').append(li);

});


jQuery("#message-form").on('submit',function(e){
  
    socket.emit('createMessage',{
        from:'User',
        text:jQuery('[name=message]').val()  
      },function(){
  
      });

    console.log(e);
return false;
});

let locationButton = jQuery('#send-location');

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported');
    }


    navigator.geolocation.getCurrentPosition(function(position){
            socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
            });
            console.log(position);
    },function(){
        alert('unable to fetch location');
    })
})