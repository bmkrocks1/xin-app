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

    /*
     * Toggle color changer drop down menu
     */
    onColorChangeClick(event) {
      event.stopPropagation();

      var thisCard = this.$();
      $('.card.open-colors').not(thisCard).removeClass('open-colors');

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

    updateColor(id, color) {
      this.get('onColorSelect')(id, color);
    },

    onRemoveClick() {
      this.get('onRemoveCard')(this.$().attr('id'));
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

    // -- Make it draggable
    $(this.$()).draggable({
      containment: '.columns-container',
      connectToSortable: '.cards-container',
      revert: 'invalid',
      zIndex: 100,
      opacity: 0.95,
      start(event, ui) {
        // -- Create a card drop placeholder at the bottom of each .cards-container
        // excluding the container where the dragged card came from.
        $('.cards-container').not(thisCard.parent()).append('<div class="card-drop-placeholder"></div>');
        $('.card-drop-placeholder')
          .css({ height: ui.helper.height() })
          .droppable({
            accept: '.card',
            tolerance: 'intersect',
            over: function(event, ui) {
              $(this).css({
                borderColor: ui.draggable.css('borderColor'),
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
      },
      drag(event, ui) {
        $('.card.open-colors').removeClass('open-colors');
        ui.helper.parent().addClass('dragging-from');
      }
    });
  }
});
