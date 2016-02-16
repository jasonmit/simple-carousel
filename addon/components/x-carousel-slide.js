import Ember from 'ember';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

import layout from '../templates/x-carousel-slide';

const { Component, computed, get } = Ember;

export default Component.extend(RecognizerMixin, {
  layout,
  tagName: 'slide',
  attributeBindings: ['draggable', 'aria-hidden'],
  classNameBindings: ['current'],

  recognizers: 'swipe',
  draggable: false,

  current: computed('active', function() {
      return get(this, 'active') === this;
  }).readOnly(),

  'aria-hidden': computed('current', function() {
    return !get(this, 'current');
  }).readOnly(),

  swipeLeft() {
    this.attrs.step(1);
  },

  swipeRight() {
    this.attrs.step(-1);
  },

  init() {
    this._super(...arguments);

    if (this.attrs['register-slide']) {
      this.attrs['register-slide'](this);
    }
  }
});
