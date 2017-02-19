import Ember from 'ember';

/* globals $ */
export default Ember.Mixin.create({
  onWindowResize: Ember.K,

  setupListener: Ember.on('init', function() {
    return $(window).on('resize', $.proxy(this.get('onWindowResize'), this));
  }),

  removeListener: Ember.on('willDestroyElement', function() {
    return $(window).off('resize', $.proxy(this.get('onWindowResize'), this));
  })
});
