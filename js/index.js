let mousePressed = false;
let lastX, lastY;
let canvas;
let canvasCtx;
let brushColor = '#000';
let brushSize = 5;

function initApp() {
  document.getElementById('fullscreen').onclick(e => window.scrollTo(0, 1));

  setDisplays();

  window.addEventListener('touchmove', e => {
    let touchX = (e.touches[0].pageX + '').substr(0, 7);
    let touchY = (e.touches[0].pageY + '').substr(0, 7);
    let pos = 'brush position:\n' + touchX + ' / ' + touchY;
    mousePos.innerHTML = pos;
  });

  window.addEventListener('mousemove', e => {
    let pos = 'brush position:\n' + e.pageX + ' / ' + e.pageY;
    mousePos.innerHTML = pos;
  });

  /* set canvas size */
  canvas = document.getElementById('myCanvas');
  canvasCtx = canvas.getContext('2d');
  canvasResize();
  window.onresize = canvasResize;

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

  /* Canvas: set touch events*/
  canvas.addEventListener('touchstart', function(e) {
    mousePressed = true;
    console.log('touchstart');

    let touch = e.touches[0];
    let mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });

    canvas.dispatchEvent(mouseEvent);
  });

  canvas.addEventListener(
    'touchmove',

    function(e) {
      console.log('touchmove');

      let touch = e.touches[0];
      let mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
      });

      canvas.dispatchEvent(mouseEvent);
    }
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

  saveBtn.addEventListener('blur', e => {
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

function setDisplays() {
  /* app version, mouse position, viewport displays setup */
  let appVersion = document.getElementById('appVersion');
  appVersion.style = 'display: block;';

  let mousePos = document.getElementById('mousePos');
  mousePos.style = 'display: block;';
  mousePos.innerHTML = 'brush position:\n' + 0 + ' / ' + 0;

  let viewport = document.getElementById('viewport');
  viewport.style = 'display: block;';
  viewport.innerHTML =
    'viewport:\n' + window.innerHeight + 'px / ' + window.innerWidth + 'px';
}

function canvasResize() {
  if (window.screen.width <= 600) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.65;
  } else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 1.2;
  }

  document.getElementById('viewport').innerHTML =
    'viewport:\n' + window.innerHeight + 'px / ' + window.innerWidth + 'px';
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
