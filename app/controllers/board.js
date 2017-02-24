import Ember from 'ember';
import WindowResizeMixin from '../mixins/window-resize';

export default Ember.Controller.extend(WindowResizeMixin, {
  actions: {
    /*
     * Create new card and persist to the store.
     */
    newCard() {
      var order = this.get('model').backlog.get('length');
      this.get('store').createRecord('card', {
        title: 'Story #' + (++order),
        order: order
      }).save();
      // TODO: created card is not added in the view.
    },

    updateCardTitle(id, newTitle) {
      this.get('store').findRecord('card', id).then(card => {
        card.set('title', newTitle);
        card.save();
      });
    },

    updateCardColor(id, newColor) {
      this.get('store').findRecord('card', id).then(card => {
        card.set('color', newColor);
        card.save();
      });
    },

    updateCardStatus(id, status) {
      this.get('store').findRecord('card', id).then(card => {
        card.set('status', status);
        card.save();
      });
    },

    updateCardsOrder() {
      // TODO: implementation
    },

    removeCard(id) {
      this.get('store').findRecord('card', id).then(card => {
        card.destroyRecord();
      });
      // TODO: fix bug where a card moved from different column then removed, it is not removed from the view.
    }
  },

  /*
   * On window resize, update height for .columns-container
   */
  onWindowResize() {
    var h = $('body').height() - 115;
    $('.columns-container').height(h + 'px');
  },

  init() {
    $(document).ready(() => { this.onWindowResize(); });
  },

  backlog: Ember.computed('model.@each.status', function() {
    return this.get('store').query('card', { status: 'backlog' });
  }),

  inProgress: Ember.computed('model.@each.status', function() {
    return this.get('store').query('card', { status: 'in-progress' });
  }),

  done: Ember.computed('model.@each.status', function() {
    return this.get('store').query('card', { status: 'done' });
  })

});
