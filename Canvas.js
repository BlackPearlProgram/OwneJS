class Ctx {

    constructor(isNew_ID, isFullScreen, RAINBOW) {

        if(isNew_ID === true) {
            this.canvas = document.createElement("canvas");
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext("2d");
        }
        else {
            /** @type {HTMLCanvasElement} */
            this.canvas = document.getElementById(isNew_ID);
            this.ctx = this.canvas.getContext("2d");
        }

        if(isFullScreen) {
            const _this = this;
            document.body.style = `
                background: rgb(30, 30, 30);
                margin: 0;
                padding: 0;
                overflow: hidden;
            `;

            !function resizeCanvas(){
                window.addEventListener("resize", resizeCanvas);
                _this.canvas.width = window.innerWidth;
                _this.canvas.height = window.innerHeight;

                _this.ctx.width = _this.canvas.width;
                _this.ctx.height = _this.canvas.height;

                if(RAINBOW !== undefined) {
                    const gradient = _this.ctx.createLinearGradient(-_this.ctx.width/2, -_this.ctx.height/2, _this.ctx.width/2, _this.ctx.height/2);
                    const stops = 12;//Math.hypot(_this.canvas.width, _this.canvas.height);
                    for(let i = 0; i < stops; i++) gradient.addColorStop(i / stops, "hsl(" + i * (360 / stops) + " 100% 50%)");
                    _this.ctx.fillStyle = gradient;
                }
            }();
        }

        const _this = this.ctx;
        _this.clear = function() {
            _this.clearRect(0, 0, _this.width, _this.height);
        }

    }

}