export default class Timer {
    
    constructor(callbacks, rate = 1 / 60) {
        this._callbacks = callbacks;
        this._rate = rate;

        this._lastTime = 0;
        this._accumulator = 0;
        this._tick = 0;
        this._lastTick = 0;
        this._frameId = null;

    }
    _loop(time) {
        if (this._lastTime) {
            this._accumulator += (time - this._lastTime) / 1000;
            while (this._accumulator > this._rate) {
                this._callbacks.update(this._rate, this._tick++);
                this._accumulator -= this._rate;
            }
        }
        this._lastTime = time;
        // render only if at least once 'update' is called
        if (this._lastTick !== this._tick) {
            this._callbacks.render();
        }
        this._lastTick = this._tick;
        this._frameId = requestAnimationFrame(this._loop.bind(this));
    }

    start() {
        this._lastTime = null;
        this._frameId = requestAnimationFrame(this._loop.bind(this));
    }

    stop() {
        cancelAnimationFrame(this._frameId);
    }

    setRate(rate) {
        if (this._rate === rate) {
            return;
        }

        this._accumulator = 0;
        this._rate = rate;
    }

}