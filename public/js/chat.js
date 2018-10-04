var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
  let params=jQuery.deparam(window.location.search);

  socket.emit('join',params,function(err){
      if(err){
            alert(err);
            window.location.href='/';
      }
      else{
          console.log('noError');
      }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList',function(users){
      let ol = jQuery('<ol></ol>');

      users.forEach(function(user){
        ol.append(jQuery("<li></li>").text(user))
      });
      jQuery("#users").html(ol);
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToButtom();
});

socket.on('newLocationMessage', function (message) {
    let formattedTime = moment(message.createdAt).format('h:mm a');
 let template=jQuery('#location-message-template').html();
 let html= Mustache.render(template,{
   createdAt:formattedTime,
   url:message.url,
   from:message.from
 });


 jQuery('#messages').append(html);
 scrollToButtom();

});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
let messageTextBox =jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
   messageTextBox.val('')
  });
});
function scrollToButtom(){
  let messages = jQuery('#messages');
  let newMessage= messages.children('li:last-child');
  let clientHeight= messages.prop('clientHeight');
  let scrollHeight = messages.prop('scrollHeight');
  let scrollTop= messages.prop('scrollTop');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight=newMessage.prev().innerHeight();


  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
locationButton.attr('disabled','disabled').text('Sending location ...');
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
locationButton.removeAttr('disabled').text('send location');

  }, function () {
locationButton.removeAttr('disabled').text('send location');

    alert('Unable to fetch location.');
  });
});
