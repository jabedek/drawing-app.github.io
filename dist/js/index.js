let lastX,lastY,canvas,canvasCtx,mousePressed=!1,brushColor="#000",brushSize=5;function initApp(){setDisplays(),window.addEventListener("touchmove",e=>{let t="brush position:\n"+(e.touches[0].pageX+"").substr(0,7)+" / "+(e.touches[0].pageY+"").substr(0,7);mousePos.innerHTML=t}),window.addEventListener("mousemove",e=>{let t="brush position:\n"+e.pageX+" / "+e.pageY;mousePos.innerHTML=t}),canvas=document.getElementById("myCanvas"),canvasCtx=canvas.getContext("2d"),canvasResize(),window.onresize=canvasResize,canvas.addEventListener("mousedown",(function(e){mousePressed=!0,console.log("%cMOUSE DOWN","background: #111; font-family:'Roboto Light'; font-weight: bold; color:white"),draw(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top,!1)})),canvas.addEventListener("mousemove",(function(e){mousePressed&&draw(e.pageX-$(this).offset().left,e.pageY-$(this).offset().top,!0)})),canvas.addEventListener("mouseup",(function(e){mousePressed=!1,console.log("%cMOUSE UP","background: #111; font-family:'Roboto Light'; font-weight: bold; color:white")})),canvas.addEventListener("mouseleave",(function(e){mousePressed=!1})),canvas.addEventListener("touchstart",(function(e){mousePressed=!0,console.log("touchstart");let t=e.touches[0],n=new MouseEvent("mousedown",{clientX:t.clientX,clientY:t.clientY});canvas.dispatchEvent(n)})),canvas.addEventListener("touchmove",(function(e){console.log("touchmove");let t=e.touches[0],n=new MouseEvent("mousemove",{clientX:t.clientX,clientY:t.clientY});canvas.dispatchEvent(n)})),canvas.addEventListener("touchend",(function(e){mousePressed=!1,console.log("touchend")}),!1),canvas.addEventListener("touchcancel",(function(e){mousePressed=!1}),!1);let e=document.getElementById("clearBtn");e.addEventListener("click",clearArea),e.addEventListener("mouseover",e=>{document.getElementById("my-clear-icon").classList.toggle("spin")}),e.addEventListener("mouseout",e=>{document.getElementById("my-clear-icon").classList.toggle("spin")});let t=document.getElementById("saveBtn");t.addEventListener("mouseover",e=>{document.getElementById("my-save-icon").classList.toggle("slide-down")}),t.addEventListener("mouseout",e=>{document.getElementById("my-save-icon").classList.toggle("slide-down")}),t.addEventListener("blur",e=>{document.getElementById("my-save-icon").classList.toggle("slide-down")}),t.addEventListener("click",(function(e){console.log("%cSAVING","background: firebrick; font-family:'Roboto Light'; font-weight: bold; color:white"),t.href=canvas.toDataURL("image/png"),t.download="image.png"}),!1),document.getElementById("sliderRange").addEventListener("change",e=>{document.getElementById("brushSize").innerHTML=e.target.value})}function draw(e,t,n){n&&(canvasCtx.strokeStyle=brushColor,canvasCtx.lineWidth=$("#sliderRange").val(),canvasCtx.lineJoin="round",canvasCtx.beginPath(),canvasCtx.moveTo(lastX,lastY),canvasCtx.lineTo(e,t),console.info(`%c ${lastX}, ${lastY} %c=>%c ${e}, ${t} `,"background: #transparent; color: white; font-family:'Roboto Light'; font-weight: bold","background: #transparent; color: rgba(255, 60, 10, 1); font-family:inherit; font-weight: bold","background: #transparent; color: white; font-family:'Roboto Light'; font-weight: bold"),canvasCtx.closePath(),canvasCtx.stroke()),lastX=e,lastY=t}function setDisplays(){document.getElementById("appVersion").style="display: block;";let e=document.getElementById("mousePos");e.style="display: block;",e.innerHTML="brush position:\n0 / 0";let t=document.getElementById("viewport");t.style="display: block;",t.innerHTML="viewport:\n"+window.innerHeight+"px / "+window.innerWidth+"px"}function canvasResize(){window.screen.width<=600?(canvas.width=window.innerWidth,canvas.height=.65*window.innerHeight):(canvas.width=window.innerWidth,canvas.height=window.innerHeight/1.2),document.getElementById("viewport").innerHTML="viewport:\n"+window.innerHeight+"px / "+window.innerWidth+"px"}function clearArea(){canvasCtx.setTransform(1,0,0,1,0,0),canvasCtx.clearRect(0,0,canvasCtx.canvas.width,canvasCtx.canvas.height)}function pickColor(e,t){brushColor=e;let n=document.getElementsByClassName("color");$.each(n,(e,n)=>{n.id===t.id?document.getElementById(n.id).classList.add("color--picked"):document.getElementById(n.id).classList.remove("color--picked")})}