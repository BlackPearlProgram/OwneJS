class Time {

    constructor() {
        
        this.date = new Date();
        this.startTime = this.date.getTime();
        this.timeSinceStart = 0;
        this.minDelta = 1/60;
        this.maxDelta = 1/10;
        this.deltaTime = this.minDelta;

    }

    update() {

        this.date = new Date();
        this.deltaTime = Math.min(this.maxDelta, Math.max(this.minDelta, (this.date.getTime() - this.startTime) * 0.001 - this.timeSinceStart));
        this.timeSinceStart = (this.date.getTime() - this.startTime) * 0.001;

    }

}