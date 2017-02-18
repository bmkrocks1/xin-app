import Ember from 'ember';

/* globals $ */
export default Ember.Component.extend({
  id: this.id,
  classNames: ['card', this.color],
  actions: {
    /*
     * Title onInput
     */
    onInput(event) {
      if (event.target.scrollHeight > 30) {
        let target = $(event.target);
        target.height('');
        target.height(Math.min(event.target.scrollHeight, /*heightLimit=*/200) + 'px');
      }
    },

    /*
     * Title onEnter
     */
    onKeyPress(event) {
      if (event.which === 13) {
        $(event.target).blur();
      }
    },

    /*
     * Title onBlur
     */
    onBlur(event) {
      var thisCard = this.$();
      thisCard.removeClass('active');
      this.get('onTitleEnter')(thisCard.attr('id'), event.target.value);
    }
  },

  didInsertElement() {
    var thisCard = this.$();
    thisCard.click((event) => {
      event.stopPropagation();

      $('.card-actions').removeClass('active');
      $('#color-chooser-dropdown').hide();

      var target = $(event.target);
      if (target.is('.card-title')) {
        thisCard.addClass('active');
      }
    });
  }
});
