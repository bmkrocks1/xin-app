import Ember from 'ember';
import DocumentClickMixin from '../mixins/document-click';
import WindowResizeMixin from '../mixins/window-resize';

/* globals $ */
export default Ember.Component.extend(DocumentClickMixin, WindowResizeMixin, {
  classNameBindings: [':card', 'color'],
  actions: {
    /*
     * Title onInput
     */
    onInput(event) {
      this.updateScrollHeight.call(event.target);
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
      thisCard.removeClass('is-editing');
      this.get('onTitleEnter')(thisCard.attr('id'), event.target.value);
    },

    onColorChangeClick(event) {
      event.stopPropagation();
      var thisCard = this.$();
      thisCard[thisCard.hasClass('open-colors') ? 'removeClass' : 'addClass']('open-colors');
    }
  },

  updateScrollHeight() {
    if (this.scrollHeight > 30) {
      let cardTitle = $(this);
      cardTitle.height('');
      cardTitle.height(Math.min(this.scrollHeight, /*heightLimit=*/200) + 'px');
    }
  },

  onWindowResize() {
    $('.card-title').each(this.updateScrollHeight);
  },

  didInsertElement() {
    var thisCard = this.$();

    thisCard.click((event) => {
      event.stopPropagation();
      thisCard.removeClass('open-colors');
      let target = $(event.target);
      if (target.is('.card-title')) {
        thisCard.addClass('is-editing');
      }
    });

    this.updateScrollHeight.call(thisCard.find('.card-title')[0]);
  }
});
