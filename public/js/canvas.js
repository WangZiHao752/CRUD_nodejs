const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
/*canvas.width = 1520; //控制粒子图的宽度
canvas.height = 719;*/

canvas.width = window.innerWidth -10;
canvas.height = window.innerHeight -10;
//  canvas.style.background = '#ff557f';//js背景地

class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.r = 20;

    }

    render() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

}
let ball = new Ball(50, 50, 'red');
ball.render();



//会移动的小球
class MoveBall extends Ball {
    constructor(x, y, color) {
        super(x, y, color);
        //量的变化
        this.dX = _.random(-5, 5);
        this.dY = _.random(5, 5);
        this.dR = _.random(1, 3);
    }
    upDate() {
        this.x += this.dX;
        this.y += this.dY;
        this.r -= this.dR;
        if (this.r < 0) {
            this.r = 0;
        }
    }

}
//实例化小球
let ballArr = [];
let colorArr = ['red', 'green', 'blue', 'yellow', 'purple', 'pink', 'orange'];
//监听鼠标移动
// canvas.addEventListener('mousemove', function(e) {
//     //  let e=e||event;
//     ballArr.push(new MoveBall(e.offsetX, e.offsetY, colorArr[_.random(0, colorArr.length - 1)]));
//     //  console.log(ballArr);
// })
//开启定时器
setInterval(function() {
    //清屏
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //绘制
    for (let i = 0; i < ballArr.length; i++) {
        ballArr[i].render();
        ballArr[i].upDate();
    }
}, 50);