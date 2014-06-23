var socket = io();
var container = document.getElementById('container');
var messageDiv = container.querySelector('.msg');
var canvas = container.querySelector('canvas');
var context = canvas.getContext('2d');
var cachedImage = null;

socket.on('connect', function() {
  showMsg('Connected. Waiting for image...');
  console.log('# Connected');
});

socket.on('reconnecting', function() {
  showMsg('Disconnected. Reconnecting...');
  console.log('# Reconnecting...');
});

socket.on('image', function(image){
  if(image != null) {
    cachedImage = 'data:image/x-png;base64,' + image;
    render(cachedImage);
    hideMsg('Done');
    console.log('# New image');
  } else {
    cachedImage = null;
    clear();
    showMsg('Connected. Waiting for image...');
    console.log('# Cleared image');
  }
});

function showMsg(txt) {
  messageDiv.innerText = txt;
  messageDiv.classList.remove('hide');
}

function hideMsg(txt) {
  messageDiv.innerText = txt;
  messageDiv.classList.add('hide');
}

function clear() {
  // canvas size = dom canvas size = window size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function render(src) {
  // canvas size = dom canvas size = window size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // Load and render image
  var img = new Image();
  img.onload = function(){
    // Calculate where to draw the image
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    var width = scale * img.width;
    var height = scale * img.height;
    var x = (canvas.width - width)/2;
    var y = (canvas.height - height)/2;

    // Pass 1: draw image to get fill colors
    context.drawImage(img, 0, 0);
    function getColorAt(x, y) {
      var cs = context.getImageData(x, y, 1, 1).data;
      return hex(cs[0], cs[1], cs[2]);
    }
    var fillTop    = getColorAt(0, 0);
    // Keep to the left as scrollbars are generally on the right
    var fillBottom = getColorAt(0, img.height-1);

    // Pass 2: draw top and bottom colors
    context.fillStyle = fillTop;
    context.fillRect(0, 0, canvas.width, canvas.height);
    if(x === 0) {
      // Only have separate bottom color if the image touches the sides,
      // or else the colors will meet
      context.fillStyle = fillBottom;
      context.fillRect(0, canvas.height/2, canvas.width, canvas.height);
    }

    // Pass 3: draw image
    context.drawImage(img, x, y, width, height);
  }
  img.src = src;
}

function hex(r,g,b) {
  return "#" + (r).toString(16) + (g).toString(16) + (b).toString(16);
}

window.addEventListener('resize', function() {
  if(cachedImage != null) {
    render(cachedImage);
  } else {
    clear();
  }
});
