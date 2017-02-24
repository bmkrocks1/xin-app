import Ember from 'ember';

export default Ember.Component.extend({
  cardsOrder: ['order'],
  orderedCards: Ember.computed.sort('cards', 'cardsOrder'),
  initSortable: function() {
    var self = this;
    // -- Make this component sortable
    $(this.$()).sortable({
      containment: '.columns-container',
      items: '.card.ui-draggable',
      tolerance: 'pointer',
      update: function(event, ui) {
        var draggedCard = ui.item,
            draggingFrom = draggedCard.parent().attr('id');

        $('.dragging-from').removeClass('dragging-from');
        draggedCard.removeClass('open-colors');
        // clear unwanted styles
        draggedCard.css({ left: '', top: '', width: '', height: ''});
        draggedCard.find('.color-chooser').attr('data-placement', draggedCard.parent().is('#done') ? 'left' : 'right');

        $(this).sortable('cancel');

        self.get('updateCardStatus')(draggedCard.attr('id'), draggedCard.parent().attr('id'));
        self.get('updateCardsOrder')();
      }
    });
  }.on('didInsertElement')

});
