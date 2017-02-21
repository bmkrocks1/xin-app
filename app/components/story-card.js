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
      $('.card.open-colors').not(thisCard).removeClass('open-colors');

      if (thisCard.hasClass('open-colors')) {
        thisCard.removeClass('open-colors');
        return;
      }

      var cardColors = thisCard.find('.card-colors'),
          offset = cardColors.offset(),
          top = offset.top + 18,
          left;

      if (cardColors.attr('data-placement') === 'left') {
        cardColors.addClass('placement-left');
        // TODO: compute left
      }
      else {
        left = offset.left + cardColors.parent().width() - 25;
      }

      cardColors.css({ top: top + 'px', left: left + 'px' });
      thisCard.addClass('open-colors');
    },

    updateColor(id, color) {
      this.get('onColorSelect')(id, color);
    },

    onRemoveClick(id) {
      this.get('onRemoveCard')(this.get('id'));
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
