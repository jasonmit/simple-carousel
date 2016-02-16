import Ember from 'ember';
import layout from '../templates/x-carousel';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  layout,
  tagName: 'carousel',

  infinite: true,
  slides: null,
  activeIndex: 0,

  active: computed('activeIndex', 'slides.[]', {
    get() {
      return get(this, 'slides').objectAt(get(this, 'activeIndex'));
    }
  }),

  init() {
    this._super(...arguments);

    set(this, 'slides', Ember.A());
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

  actions: {
    'register-slide'(slide) {
      get(this, 'slides').addObject(slide);
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

    navigate(index) {
      this.setActiveByIndex(index);
    }
  }
});
