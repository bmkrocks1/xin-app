import Ember from 'ember';

/* globals $ */
export default Ember.Controller.extend({
  actions: {
    /*
     * Creates new card and persists it to localStorage.
     */
    newCard() {
      var createdCard = this.get('store').createRecord('card', { title: 'Story #1' });
      createdCard.save();
    },

    /*
     * Card click handler.
     */
    onCardClick(event) {
      $('.card-actions').removeClass('active');
      $('#color-chooser-dropdown').hide();

      var target = $(event.target);
      if (target.is('.card-title')) {
        target.closest('.card').addClass('active');
      }

      return false;
    },

    /*
     * Updates card title given its ID in localStorage.
     */
    updateTitle(id, title) {
      this.get('store').findRecord('card', id).then(function(card) {
        card.set('title', title);
        card.save();
      });
    }
  }
});
