import Ember from 'ember';

const { run } = Ember;

function PauseableRunLater(context, fn, delay) {
  this._fn = fn;
  this._context = context;
  this._remaining = delay;
  this.start();
}

PauseableRunLater.prototype = {
  constructor: PauseableRunLater,

  stop() {
    run.cancel(this._scheduler);
  },

  pause() {
    this.stop();
    this._remaining -= new Date() - this._startedOn;
  },

  start() {
    this._startedOn = new Date();
    this._scheduler = run.later(this._context, this._fn, this._remaining);
  },

  unpause() {
    this.start();
  }
}

export default PauseableRunLater;
