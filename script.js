// Create Shortcut
const V = VecCreateShortcut;


// zoom
let zoom = 2;


window.addEventListener("load", () => {

    // initialize Canvas and Time
    const ctx = new Ctx(true, true).ctx;
    const time = new Time();


    // create vectors
    let particles = [];

    function createParticle() {
        const angle = Math.random() * Math.PI * 2;
        const fact = Math.random() * 100;
        const fact2 = Math.random() * 5 + 15;
        particles.push({
            position: V(Math.cos(angle) * fact, Math.sin(angle) * fact),
            velocity: V(Math.cos(angle + Math.PI/2) * fact2, Math.sin(angle + Math.PI/2) * fact2),
            lifeTime: 0
        });
    }

    for(let i = 0; i < 100; i++) createParticle();


    // loop
    !function loop(){

        // update loop, time and background
        time.update();
        //ctx.fillRect(0, 0, ctx.width, ctx.height);
        ctx.clear();
        window.requestAnimationFrame(loop);

        // demo by using the functions
        for (let i = 0; i < 20; i++) createParticle();

        const ratio = Math.max(ctx.width, ctx.height) / Math.min(ctx.width, ctx.height);

        particles = particles.filter(particle => {
            particle.position["+="](particle.velocity["*"](time.deltaTime * 1)(true))();
            return !(particle.position.x > ratio * 100 * zoom || particle.position.x < ratio * -100 * zoom || particle.position.y > ratio * 100 * zoom || particle.position.y < ratio * -100 * zoom);
        });

        // placing objects
        const smallestSide = Math.min(ctx.width, ctx.height);
        const size = smallestSide * 0.01 / zoom;
        const factor = smallestSide / 200 / zoom;

        ctx.save();
            ctx.translate(ctx.width/2 - size/2, ctx.height/2 - size/2);
            for(let i = 0; i < particles.length; i++) {
                particles[i].lifeTime += time.deltaTime;
                ctx.fillStyle = "hsl(0 0% " + (100 - particles[i].lifeTime * 10) + "%)";
                ctx.fillRect(factor * particles[i].position.x, factor * particles[i].position.y, size, size);
            }
        ctx.restore();

    }();

}, {once: true});