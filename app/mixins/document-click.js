import Ember from 'ember';

/* globals $ */
export default Ember.Mixin.create({
  onDocumentClick: Ember.K,

  setupListener: Ember.on('init', function() {
    return $(document).on('click', $.proxy(this.get('onDocumentClick'), this));
  }),

  removeListener: Ember.on('willDestroyElement', function() {
    return $(document).off('click', $.proxy(this.get('onDocumentClick'), this));
  })
});
