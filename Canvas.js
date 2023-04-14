var Ctx = /** @class */ (function () {
    function Ctx(isNew_ID, isFullScreen, RAINBOW) {
        var _this = this;
        // create context element
        if (isNew_ID === true) {
            this.canvas = document.createElement("canvas");
            document.body.appendChild(this.canvas);
            this.ctx = this.canvas.getContext("2d");
        }
        else if (typeof isNew_ID === "string") {
            this.canvas = document.getElementById(isNew_ID);
            this.ctx = this.canvas.getContext("2d");
        }
        // mouse
        this.mouse = new Vector(0, 0);
        this.mouse.onScreen = false;
        this.canvas.addEventListener("mousemove", function (event) {
            _this.mouse.onScreen = true;
            var canvasRect = _this.canvas.getBoundingClientRect();
            var mousePage = new Vector()["search"](event, "client");
            var mouse = new Vector(canvasRect.left, canvasRect.top)["-"](mousePage)();
            _this.mouse.x = -mouse.x;
            _this.mouse.y = -mouse.y;
        });
        this.canvas.addEventListener("mouseleave", function () { return _this.mouse.onScreen = false; });
        this.canvas.addEventListener("mouseenter", function () { });
        document.documentElement.addEventListener("mouseleave", function () { _this.mouse.onScreen = false; });
        var _loop_1 = function (key) {
            if (key !== "mozImageSmoothingEnabled" && key !== "mozTextStyle") {
                if (typeof this_1.ctx[key] === "function") {
                    this_1[key] = this_1.ctx[key].bind(this_1.ctx);
                }
                else {
                    Object.defineProperty(this_1, key, {
                        get: function () {
                            return this.ctx[key];
                        },
                        set: function (val) {
                            this.ctx[key] = val;
                        }
                    });
                }
            }
        };
        var this_1 = this;
        // copy ctx functions / variables
        for (var key in this.ctx) {
            _loop_1(key);
        }
        // apply for lazy peaple
        if (isFullScreen) {
            document.body.style.margin = "0";
            document.body.style.padding = "0";
            document.body.style.overflow = "hidden";
            window.addEventListener("resize", this.resizeCanvas.bind(this));
            this.resizeCanvas();
            if (RAINBOW !== undefined) {
                window.addEventListener("resize", this.applyRainbow.bind(this, RAINBOW));
                this.applyRainbow(RAINBOW);
            }
        }
        // custom functions
        this.fillRect = function (a, b, c, d) {
            if (a instanceof Vector && b instanceof Vector) {
                _this.ctx.fillRect(a.x, a.y, b.x, b.y);
            }
            else if (typeof a === 'number' && typeof b === 'number' && typeof c === 'number' && typeof d === 'number') {
                _this.ctx.fillRect(a, b, c, d);
            }
            else {
                console.error("Canvas.js function: Context.fillRect \nOption 1: Didn't get input values of the type 'number' or 'Vector'. \nOption 2: Didn't get enough values.");
            }
        };
    }
    Ctx.prototype.applyRainbow = function (RAINBOW) {
        if (/^rainbo.*w$/i.test(RAINBOW)) {
            var stops = 12;
            // fillStyle
            var fillGradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
            for (var i = 0; i < stops; i++)
                fillGradient.addColorStop(i / stops, "hsl(" + i * (360 / stops) + " 100% 50%)");
            this.fillStyle = fillGradient;
            // strokeStyle
            var strokeGradient = this.ctx.createLinearGradient(this.width, this.height, 0, 0);
            for (var i = 0; i < stops; i++)
                strokeGradient.addColorStop(i / stops, "hsl(" + i * (360 / stops) + " 100% 50%)");
            this.strokeStyle = strokeGradient;
        }
    };
    Ctx.prototype.resizeCanvas = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    };
    Ctx.prototype.clear = function () {
        this.clearRect(0, 0, this.width, this.height);
    };
    return Ctx;
}());
