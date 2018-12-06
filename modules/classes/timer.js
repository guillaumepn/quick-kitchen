export default class Timer {
    constructor(id, duration, type, last = 0, done = null) {
        this._id = id;
        this._duration = duration;
        this._type = type;
        this.timerId = null;
        this._done = done;
        this._last = last;

        this.run.bind(this);
        this.run();
    }

    html() {
        let html = document.createElement('div');
        html.classList.add('timer');

        let chrono = document.createElement('span');
        chrono.classList.add('chrono');
        chrono.setAttribute('data-duration', this.duration);
        chrono.innerText = this.duration;

        let timerImage = document.createElement('img');
        timerImage.src = 'images/timer.svg';
        timerImage.classList.add('icon');

        html.append(chrono, timerImage);
        return html;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        this._duration = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get last() {
        return this._last;
    }

    set last(value) {
        this._last = value;
    }

    get done() {
        return this._done;
    }

    set done(value) {
        this._done = value;
    }

    run(now) {
        if(!this.last || now - this.last >= 1000) {
            this.last = now;
            this.duration--;
        }

        if (this.duration <= 0) {
            this.stop();
        } else {
            this.timerId = requestAnimationFrame(this.run.bind(this));
        }
    }

    stop() {
        this.done = true;
        cancelAnimationFrame(this.timerId);
    }
}