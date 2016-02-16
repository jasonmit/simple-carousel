import Ember from 'ember';
import layout from '../templates/x-carousel';

const { Component, computed, get, set } = Ember;

export default Component.extend({
  layout,
  tagName: 'carousel',

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

  actions: {
    'register-slide'(slide) {
      get(this, 'slides').addObject(slide);
    },

    step(direction) {
      const activeIndex = get(this, 'activeIndex');
      const length = get(this, 'slides.length');

      let next = activeIndex + direction;

      if (next < 0) { next = (length - 1); }
      else if (next >= length) { next = 0; }

      set(this, 'activeIndex', next);
    },

    navigate(index) {
      set(this, 'activeIndex', index);
    }
  }
});
