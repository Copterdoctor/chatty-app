window.addEventListener('load', eventWindowLoaded, false);
// window.addEventListener('resize', canvasApp);

(function () {

  window.addEventListener("resize", resizeThrottler, false);

  var resizeTimeout;
  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        canvasApp();

        // The actualResizeHandler will execute at a rate of 15fps
      }, 1000);
    }
  }

}());

function eventWindowLoaded() {
  canvasApp();
}
function canvasSupport(e) {
  return !!e.getContext;
}
function canvasApp() {
  var canvas = document.getElementById('canvas');
  if (!canvasSupport(canvas)) {
    return;
  }
  var ctx = canvas.getContext('2d');
  var w = canvas.width = window.innerWidth;
  var h = canvas.height = window.innerHeight;
  var yPositions = Array(275).join(0).split('');
  function runMatrix() {
    var Game_interval;
    if (typeof Game_Interval != 'undefined') clearInterval(Game_interval);
    Game_Interval = setInterval(drawScreen, 100);
  }
  function drawScreen() {
    ctx.fillStyle = 'rgba(0,0,0,.07)';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#0C85D3';
    ctx.font = '10px Georgia';
    yPositions.map(function (y, index) {
      var text = String.fromCharCode(100 + Math.random() * 33);
      x = (index * 10);
      ctx.fillText(text, x, y);
      if (y > 100 + Math.random() * 30000) {
        yPositions[index] = 0;
      } else {
        yPositions[index] = y + 10;
      }
    })
  }
  runMatrix();
}
