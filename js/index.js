let mousePressed = false;
let lastX, lastY;
let canvas;
let canvasCtx;
let brushColor = '#000';
let brushSize = 5;

function initApp() {
  /* mouse position display setup */
  let mousePos = document.getElementById('mousePos');
  mousePos.style = 'display: block;';

  window.addEventListener('touchmove', e => {
    let touchX = (e.touches[0].pageX + '').substr(0, 7);
    let touchY = (e.touches[0].pageY + '').substr(0, 7);
    let pos = 'X:' + touchX + '\n' + 'Y:' + touchY;
    mousePos.innerHTML = pos;
  });

  window.addEventListener('mousemove', e => {
    let pos = 'X:' + e.pageX + '\n' + 'Y:' + e.pageY;
    mousePos.innerHTML = pos;
  });

  /* set canvas size */
  canvas = document.getElementById('myCanvas');
  canvasCtx = canvas.getContext('2d');

  if (window.screen.width <= 600) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.65;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 1.2;
  }

  window.onresize = e => {
    if (window.screen.width <= 600) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.65;
    } else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 1.2;
    }
  };

  /* Canvas: set touch events*/
  canvas.addEventListener(
    'touchmove',
    function(e) {
      console.log('touchmove');
      var touch = e.touches[0];
      var mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });
      canvas.dispatchEvent(mouseEvent);
    },
    false
  );

  canvas.addEventListener(
    'touchstart',
    function(e) {
      mousePressed = true;
      console.log('touchstart');

      draw(
        e.pageX - $(this).offset().left,
        e.pageY - $(this).offset().top,
        false
      );
    },
    false
  );

  canvas.addEventListener(
    'touchend',
    function(e) {
      mousePressed = false;
      console.log('touchend');
    },
    false
  );

  canvas.addEventListener(
    'touchcancel',
    function(e) {
      mousePressed = false;
    },
    false
  );

  canvas.addEventListener(
    'touchmove',
    function(e) {
      if (mousePressed) {
        draw(
          e.pageX - $(this).offset().left,
          e.pageY - $(this).offset().top,
          true
        );
      }
    },
    false
  );

  /* Canvas: set mouse events*/
  canvas.addEventListener('mousedown', function(e) {
    mousePressed = true;
    console.log(
      '%cMOUSE DOWN',
      "background: #111; font-family:'Roboto Light'; font-weight: bold; color:white"
    );

    draw(
      e.pageX - $(this).offset().left,
      e.pageY - $(this).offset().top,
      false
    );
  });

  canvas.addEventListener('mousemove', function(e) {
    if (mousePressed) {
      draw(
        e.pageX - $(this).offset().left,
        e.pageY - $(this).offset().top,
        true
      );
    }
  });

  canvas.addEventListener('mouseup', function(e) {
    mousePressed = false;
    console.log(
      '%cMOUSE UP',
      "background: #111; font-family:'Roboto Light'; font-weight: bold; color:white"
    );
  });

  canvas.addEventListener('mouseleave', function(e) {
    mousePressed = false;
  });

  /* CLEAR button events */
  let clearBtn = document.getElementById('clearBtn');

  clearBtn.addEventListener('click', clearArea);

  clearBtn.addEventListener('mouseover', e => {
    let icon = document.getElementById('my-clear-icon');
    icon.classList.toggle('spin');
  });

  clearBtn.addEventListener('mouseout', e => {
    let icon = document.getElementById('my-clear-icon');
    icon.classList.toggle('spin');
  });

  /* SAVE button events */
  let saveBtn = document.getElementById('saveBtn');

  saveBtn.addEventListener('mouseover', e => {
    let icon = document.getElementById('my-save-icon');
    icon.classList.toggle('slide-down');
  });

  saveBtn.addEventListener('mouseout', e => {
    let icon = document.getElementById('my-save-icon');
    icon.classList.toggle('slide-down');
  });

  saveBtn.addEventListener(
    'click',
    function(ev) {
      console.log(
        '%cSAVING',
        "background: firebrick; font-family:'Roboto Light'; font-weight: bold; color:white"
      );
      saveBtn.href = canvas.toDataURL('image/png');
      saveBtn.download = 'image.png';
    },
    false
  );

  /* RANGE events */

  document.getElementById('sliderRange').addEventListener('change', e => {
    document.getElementById('brushSize').innerHTML = e.target.value;
  });
}

function draw(x, y, isDrawing) {
  if (isDrawing) {
    canvasCtx.strokeStyle = brushColor;
    canvasCtx.lineWidth = $('#sliderRange').val();
    canvasCtx.lineJoin = 'round';

    canvasCtx.beginPath();
    canvasCtx.moveTo(lastX, lastY);
    canvasCtx.lineTo(x, y);

    /* Log brush trace */
    console.info(
      `%c ${lastX}, ${lastY} %c=>%c ${x}, ${y} `,

      "background: #transparent; color: white; font-family:'Roboto Light'; font-weight: bold",

      'background: #transparent; color: rgba(255, 60, 10, 1); font-family:inherit; font-weight: bold',

      "background: #transparent; color: white; font-family:'Roboto Light'; font-weight: bold"
    );

    canvasCtx.closePath();
    canvasCtx.stroke();
  }

  lastX = x;
  lastY = y;
}

function clearArea() {
  // Use the identity matrix while clearing the canvas
  canvasCtx.setTransform(1, 0, 0, 1, 0, 0);
  canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
}

function pickColor(color, sender) {
  brushColor = color;
  let list = document.getElementsByClassName('color');

  $.each(list, (index, value) => {
    if (value.id === sender.id) {
      document.getElementById(value.id).classList.add('color--picked');
    } else {
      document.getElementById(value.id).classList.remove('color--picked');
    }
  });
}
