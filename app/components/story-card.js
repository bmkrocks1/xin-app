import Ember from 'ember';
import DocumentClickMixin from '../mixins/document-click';
import WindowResizeMixin from '../mixins/window-resize';

export default Ember.Component.extend(DocumentClickMixin, WindowResizeMixin, {
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
      this.get('updateCardTitle')(thisCard.attr('id'), event.target.value);
    },

    /*
     * Toggle color chooser menu
     */
    onColorChooserClick(event) {
      event.stopPropagation();

      var thisCard = this.$();
      $('.open-colors').not(thisCard).removeClass('open-colors');

      if (thisCard.hasClass('open-colors')) {
        thisCard.removeClass('open-colors');
        return;
      }

      var cardColors = thisCard.find('.card-colors'),
          colorChooser = thisCard.find('.color-chooser'),
          top = 18,
          left;

      if (colorChooser.attr('data-placement') === 'left') {
        cardColors.addClass('placement-left');
        left = cardColors.parent().width() - cardColors.width() + 6;
      }
      else {
        cardColors.removeClass('placement-left');
        left = cardColors.parent().width() - 25;
      }

      cardColors.css({ top: top + 'px', left: left + 'px' });
      thisCard.addClass('open-colors');
    },

    onRemoveClick() {
      this.get('removeCard')(this.$().attr('id'));
    },

    updateCardColor(id, color) {
      this.get('updateCardColor')(id, color);
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

    thisCard.click(event => {
      event.stopPropagation();
      thisCard.removeClass('open-colors');
      let target = $(event.target);
      if (target.is('.card-title')) {
        thisCard.addClass('is-editing');
      }
    });

    thisCard.find('.color-chooser').attr('data-placement', thisCard.parent().is('#done') ? 'left' : 'right');
    this.updateScrollHeight.call(thisCard.find('.card-title')[0]);

    // -- Make it draggable
    $(this.$()).draggable({
      containment: '.columns-container',
      connectToSortable: '.cards-container',
      revert: 'invalid',
      zIndex: 100,
      opacity: 0.95,
      start() {
        $('.open-colors').removeClass('open-colors');
        thisCard.parent().addClass('dragging-from');
        // -- Create a card drop placeholder at the bottom of each .cards-container
        // excluding the container where the dragged card came from.
        $('.cards-container').not(thisCard.parent()).append('<div class="card-drop-placeholder"></div>');
        $('.card-drop-placeholder')
          .css({ height: thisCard.height() })
          .droppable({
            accept: '.card',
            tolerance: 'intersect',
            over: function() {
              $(this).css({
                borderColor: thisCard.css('borderColor'),
                background: '#eee'
              });
            },
            out: function() {
              $(this).css({ borderColor: '', background: '' });
            }
          });
      },
      stop() {
        // -- Remove the card drop placeholders
        $('.card-drop-placeholder').remove();
      }
    });
  }
});
