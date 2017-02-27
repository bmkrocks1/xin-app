import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cards-container'],
  cardsOrder: ['order:asc'],
  orderedCards: Ember.computed.sort('cards', 'cardsOrder'),
  initSortable: function() {
    var self = this;
    // -- Make this component sortable
    $(this.$()).sortable({
      containment: '.columns-container',
      items: '.card.ui-draggable',
      update: function(event, ui) {
        var draggedCard = ui.item,
            draggingFrom = $('.dragging-from'),
            draggingFromId = draggingFrom.attr('id'),
            draggingTo = draggedCard.parent(),
            draggingToId = draggingTo.attr('id');

        draggingFrom.removeClass('dragging-from');
        draggedCard.removeClass('open-colors');
        // clear unwanted styles
        draggedCard.css({ left: '', top: '', width: '', height: ''});
        draggedCard.find('.color-chooser').attr('data-placement', draggingTo.is('#done') ? 'left' : 'right');

        var columns = {};
        columns[draggingFromId] = $.map(draggingFrom.find('.card'), card => card.id);
        columns[draggingToId] = $.map(draggingTo.find('.card'), card => card.id);
        self.reorderCards(columns, draggedCard.attr('id'));

        if (draggingFromId !== draggingToId) {
          // remove doppelganger
          draggedCard.remove();
        }
      }
    });
  }.on('didInsertElement')
});
