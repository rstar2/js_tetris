

function createWorker(callbacks, rate, renderOnUpdateOnly, name) {
    let lastTime = 0;
    let accumulator = 0;
    let tick = 0;
    let lastTick = 0;
    let frameId = null;
    let isStopped = true;

    const loop = function (time) {
        if (name >= 2) 
            console.log("next", name, lastTime, accumulator, time, (time - lastTime));
        if (lastTime) {
            accumulator += (time - lastTime) / 1000;
            while (accumulator > rate) {
                if (isStopped) {
                    console.log("stopped", name)
                    // this means this worker is meanwhile stopped, so just return 
                    return;
                }

                console.log("update", name)
                callbacks.update(rate, tick++);
                accumulator -= rate;
            }
        } else {
            console.log("first", name)
        }
        if (isStopped) {
            console.log("stopped", name)
            // this means this worker is meanwhile stopped, so just return 
            return;
        }
        lastTime = time;
        // render only if at least once 'update' is called
        // or if render is desired to be called always (this._renderOnUpdateOnly is false)
        if (!renderOnUpdateOnly || lastTick !== tick) {
            callbacks.render();
        }
        lastTick = tick;
        frameId = requestAnimationFrame(loop);
    };

    return {
        start: function () {
            isStopped = false;
            if (!frameId) {
                console.log("start", name)
                frameId = requestAnimationFrame(loop);
            }
            
        },

        stop: function () {
            isStopped = true;
            
            if (frameId) {
                console.log("stop", name)
                cancelAnimationFrame(frameId);
                frameId = null;
            }
        }
    };
}

export default class Timer {

    constructor(callbacks, rate = 1 / 60, renderOnUpdateOnly = true) {
        this._callbacks = callbacks;
        this._rate = rate;
        this._renderOnUpdateOnly = renderOnUpdateOnly;

        // if not supplied proper callback methods (update and render) then create noop/dummy ones
        if (!callbacks.update) {
            callbacks.update = () => { };
        }
        if (!callbacks.render) {
            callbacks.render = () => { };
        }
        this.NAME = 0;
    }

    start() {
        this.NAME++;
        this.stop();

        this._worker = createWorker(this._callbacks, this._rate, this._renderOnUpdateOnly, this.NAME);
        this._worker.start();
    }

    stop() {
        if (this._worker) {
            this._worker.stop();
            this._worker = null;
        }
    }

    setRate(rate) {
        // TODO:
        if (this._rate === rate) {
            return;
        }

        this._accumulator = 0;
        this._rate = rate;
    }

}