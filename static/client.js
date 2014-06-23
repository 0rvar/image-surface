var socket = io();
var container = document.getElementById('container');
var msg = container.querySelector('.msg');

socket.on('connect', function() {
  msg.innerText = 'Connected. Waiting for image...';
  msg.style.display = null;
  console.log('# Connected');
});

socket.on('reconnecting', function() {
  msg.innerText = 'Disconnected. Reconnecting...';
  msg.style.display = null;
  console.log('# Reconnecting...');
});

socket.on('image', function(image){
  if(image != null) {
    var src = 'url(data:image/x-png;base64,' + image + ')';
    container.style.backgroundImage = src;
    msg.innerText = '';
    msg.style.display = 'none';
    console.log('# New image');
  } else {
    container.style.backgroundImage = null;
    msg.innerText = 'Connected. Waiting for image...';
    msg.style.display = null;
    console.log('# Cleared image');
  }
});
