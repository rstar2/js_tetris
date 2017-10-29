
export default class Timer {

    constructor(callbacks, rate = 1 / 60, renderOnUpdateOnly = true) {
        this._callbacks = callbacks;
        this._rate = rate;
        this._renderOnUpdateOnly = renderOnUpdateOnly;

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

                if (!this._frameId) {
                    // this means the timer is meanwhile stopped
                    // so just return
                    return;
                }
                this._accumulator -= this._rate;
            }
        }
        this._lastTime = time;
        // render only if at least once 'update' is called
        // or if render is desired to be called always (this._renderOnUpdateOnly is false)
        if (!this._renderOnUpdateOnly || this._lastTick !== this._tick) {
            this._callbacks.render();
        }
        this._lastTick = this._tick;
        this._frameId = requestAnimationFrame(this._loop.bind(this));
    }

    start() {
        // Note if calling again start() after stop()
        // then it MUST BE done in a new event-loop cycle in order to really stop current 'while loop'
        // TODO: implement this by a new inner class/object that is created on each new start 
        this._frameId = requestAnimationFrame(this._loop.bind(this));
    }

    stop() {
        if (this._frameId) {
            cancelAnimationFrame(this._frameId);
            this._frameId = null;
            this._lastTime = 0;
            this._accumulator = 0;
        }
    }

    setRate(rate) {
        if (this._rate === rate) {
            return;
        }

        this._accumulator = 0;
        this._rate = rate;
    }

}