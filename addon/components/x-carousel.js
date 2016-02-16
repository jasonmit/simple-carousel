import Ember from 'ember';
import layout from '../templates/x-carousel';

const { Component, computed, get, set, run } = Ember;

export default Component.extend({
  layout,
  tagName: 'carousel',

  infinite: true,
  autoplay: false,
  timeout: 7000,

  slides: null,
  activeIndex: 0,

  state: {
    hovering: false
  },

  active: computed('activeIndex', 'slides.[]', {
    get() {
      return get(this, 'slides').objectAt(get(this, 'activeIndex'));
    }
  }),

  init() {
    this._super(...arguments);

    set(this, 'slides', Ember.A());
  },

  didInsertElement() {
    this._super(...arguments);

    if (get(this, 'autoplay')) {
      this.tick(true);
    }
  },

  step(direction) {
    const activeIndex = get(this, 'activeIndex');
    const length = get(this, 'slides.length');

    if (!length) {
      throw new Error('slides not set or empty');
    }

    let next = activeIndex + direction;

    if (get(this, 'infinite')) {
      if (next < 0) { next = (length - 1); }
      else if (next >= length) { next = 0; }
    }

    next = Math.min(next, (length - 1));
    next = Math.max(next, 0);

    this.setActiveByIndex(next);
  },

  mouseEnter() {
    set(this, 'state.hovering', true);
  },

  mouseLeave() {
    set(this, 'state.hovering', false);
  },

  setActiveByIndex(newIndex) {
    if (this.attrs['on-before-change']) {
      const result = this.attrs['on-before-change'](newIndex);

      if (typeof result === 'boolean' && !result) {
        return false;
      }
    }

    set(this, 'activeIndex', newIndex);

    if (this.attrs['on-change']) {
      this.attrs['on-change'](newIndex);
    }
  },

  tick(firstRun) {
    if (!firstRun && !get(this, 'state.hovering')) {
      this.step(1);
    }

    run.later(this, 'tick', get(this, 'timeout'));
  },

  willDestroyElement() {
    this._super(...arguments);

    run.cancel(this.autoScheduler);
  },

  actions: {
    'register-slide'(slide) {
      get(this, 'slides').addObject(slide);
    },

    step(direction) {
      this.step(direction);
    },

    navigate(index) {
      this.setActiveByIndex(index);
    }
  }
});
