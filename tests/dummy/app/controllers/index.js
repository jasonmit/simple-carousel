import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    'dot-clicked'() {
      return false;
    },
    'slide-changed'() {
      return false;
    }
  }
});
