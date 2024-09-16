console.log("hello");

const canvas = document.getElementById('canvas-main');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = '/static/calio/images/calc/28s.png';
img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

const btn_round = new Image();
btn_round.src = '/static/calio/images/calc/btn_rd_28.png';
btn_round.onload = function() {
    ctx.drawImage(btn_round, 130, 200, 30, 30);
};
