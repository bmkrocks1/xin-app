import Ember from 'ember';

/* globals $ */
export default Ember.Component.extend({
  actions: {
    /*
     * Title's on input handler.
     */
    onTitleInput(event) {
      var target = $(event.target);
      if (event.target.scrollHeight > 30) {
        target.height('');
        target.height(Math.min(event.target.scrollHeight, /*heightLimit=*/200) + 'px');
      }
    },

    /*
     * Title's on enter listener.
     */
    onKeyPress(event) {
      if (event.which === 13) {
        var target = $(event.target);
        target.blur().closest('.card').removeClass('active');
        this.get('onTitleEnter')(target.closest('.card').attr('id'), target.val());
        return false;
      }
    }
  }
});
