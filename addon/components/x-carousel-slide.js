import Ember from 'ember';
import layout from '../templates/x-carousel-slide';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

const { Component, computed, get } = Ember;

export default Component.extend(RecognizerMixin, {
  layout,
  tagName: 'slide',
  attributeBindings: ['draggable'],
  classNameBindings: ['current'],

  recognizers: 'swipe',
  draggable: false,

  current: computed('active', {
    get() {
      return get(this, 'active') === this;
    }
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
