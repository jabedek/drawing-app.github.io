let mousePressed = false;
let lastX, lastY;
let canvas;
let canvasCtx;
let brushColor = '#000';
let brushSize = 5;

function initCanvas() {
  /* ### CANVAS ### */
  canvas = document.getElementById('myCanvas');

  canvas.addEventListener(
    'touchstart',
    function(e) {
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
    },
    false
  );
  canvas.addEventListener(
    'touchend',
    function(e) {
      mousePressed = false;
      console.log(
        '%cMOUSE UP',
        "background: #111; font-family:'Roboto Light'; font-weight: bold; color:white"
      );
    },
    false
  );
  // canvas.addEventListener('touchcancel', handleCancel, false);
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

  canvasCtx = canvas.getContext('2d');

  // canvasCtc.canvas.width = window.innerWidth;
  // canvasCtc. height = window.innerHeight / 1.22;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight / 1.22;

  window.onresize = e => {
    // console.log(window.innerWidth, window.innerHeight, 'DUPA');
    if (window.innerWidth == 980) {
      console.log('== 980');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 2;
    } else {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 1.22;
    }
  };

  // console.log(canvas.getBoundingClientRect());
  /* attach mouse events to canvas */
  $('#myCanvas').mousedown(function(e) {
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

  $('#myCanvas').mousemove(function(e) {
    if (mousePressed) {
      draw(
        e.pageX - $(this).offset().left,
        e.pageY - $(this).offset().top,
        true
      );
    }
  });

  $('#myCanvas').mouseup(function(e) {
    mousePressed = false;
    console.log(
      '%cMOUSE UP',
      "background: #111; font-family:'Roboto Light'; font-weight: bold; color:white"
    );
  });

  $('#myCanvas').mouseleave(function(e) {
    mousePressed = false;
  });

  /* ### TOOLS ### */
  /* attach mouse events to CLEAR button */
  let clearBtn = document.getElementById('clearBtn');

  $('#clearBtn').on('mouseover', e => {
    let icon = document.getElementById('my-clear-icon');
    icon.classList.toggle('spin');
  });

  $('#clearBtn').on('mouseout', e => {
    let icon = document.getElementById('my-clear-icon');
    icon.classList.toggle('spin');
  });
  clearBtn.addEventListener('click', clearArea);

  /* attach mouse events to DOWNLOAD button */
  let downloadBtn = document.getElementById('downloadBtn');

  downloadBtn.addEventListener('mouseover', e => {
    let icon = document.getElementById('my-download-icon');
    icon.classList.toggle('slide-down');
  });

  downloadBtn.addEventListener('mouseout', e => {
    let icon = document.getElementById('my-download-icon');
    icon.classList.toggle('slide-down');
  });

  downloadBtn.addEventListener(
    'click',
    function(ev) {
      console.log(
        '%cSAVING',
        "background: firebrick; font-family:'Roboto Light'; font-weight: bold; color:white"
      );
      downloadBtn.href = canvas.toDataURL('image/png');
      downloadBtn.download = 'image.png';
    },
    false
  );

  /* RANGE display */
  $('#myRange').on('change', e => {
    document.getElementById('brushSize').innerHTML = e.target.value;
  });
}

function draw(x, y, isDrawing) {
  if (isDrawing) {
    canvasCtx.strokeStyle = brushColor;
    canvasCtx.lineWidth = $('#myRange').val();
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
