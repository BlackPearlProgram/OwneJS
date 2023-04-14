interface Ctx extends CanvasRenderingContext2D {}

interface Mouse extends Vector {
  onScreen: boolean;
}

class Ctx {
  foo: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  mouse: Mouse;
  applyCss: Function;
  
  constructor(isNew_ID: boolean | string, isFullScreen: boolean, RAINBOW?: string) {

    // create context element
    if (isNew_ID === true) {
      this.canvas = document.createElement("canvas");
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    } else if(typeof isNew_ID === "string") {
      this.canvas = document.getElementById(isNew_ID) as HTMLCanvasElement;
      this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    // mouse
    this.mouse = new Vector(0, 0) as Mouse;
    this.mouse.onScreen = false;

    this.canvas.addEventListener("mousemove", (event) => {
      this.mouse.onScreen = true;
      const canvasRect = this.canvas.getBoundingClientRect();
      const mousePage = new Vector() ["search"] (event, "client");
      const mouse = new Vector(canvasRect.left, canvasRect.top) ["-"] (mousePage)();
      this.mouse.x = -mouse.x;
      this.mouse.y = -mouse.y;
    });

    this.canvas.addEventListener("mouseleave", () => this.mouse.onScreen = false);
    this.canvas.addEventListener("mouseenter", () => {});
    document.documentElement.addEventListener("mouseleave", () => {this.mouse.onScreen = false});

    // copy ctx functions / variables
    for (let key in this.ctx) {
      if (key !== "mozImageSmoothingEnabled" && key !== "mozTextStyle") {
        if (typeof this.ctx[key] === "function") {
          this[key] = this.ctx[key].bind(this.ctx);
        } else {
          Object.defineProperty(this, key, {
            get: function() {
              return this.ctx[key];
            },
            set: function(val) {
              this.ctx[key] = val;
            }
          });
        }
      }
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
    this.fillRect = (a: number | Vector, b: number | Vector, c?: number, d?: number) => {

      if(a instanceof Vector && b instanceof Vector) {
        this.ctx.fillRect(a.x, a.y, b.x, b.y);
      } else if(typeof a === 'number' && typeof b === 'number' && typeof c === 'number' && typeof d === 'number') {
        this.ctx.fillRect(a, b, c, d);
      } else {
        console.error(
          `Canvas.js function: Context.fillRect \nOption 1: Didn't get input values of the type 'number' or 'Vector'. \nOption 2: Didn't get enough values.`
        );
      }

    }
  }

  applyRainbow(RAINBOW: string) {
    if (/^rainbo.*w$/i.test(RAINBOW)) {
      const stops = 12;

      // fillStyle
      const fillGradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
      for (let i = 0; i < stops; i++) fillGradient.addColorStop(i / stops, "hsl(" + i * (360 / stops) + " 100% 50%)");
      this.fillStyle = fillGradient;

      // strokeStyle
      const strokeGradient = this.ctx.createLinearGradient(this.width, this.height, 0, 0);
      for (let i = 0; i < stops; i++) strokeGradient.addColorStop(i / stops, "hsl(" + i * (360 / stops) + " 100% 50%)");
      this.strokeStyle = strokeGradient;
    }
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  clear() {
    this.clearRect(0, 0, this.width, this.height);
  }

}