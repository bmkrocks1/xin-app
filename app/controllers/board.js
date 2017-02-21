import Ember from 'ember';
import WindowResizeMixin from '../mixins/window-resize';

/* globals $ */
export default Ember.Controller.extend(WindowResizeMixin, {
  counter: 1,
  actions: {
    /*
     * Create new card and persist to localStorage.
     */
    newCard() {
      this.get('store').createRecord('card', { title: `Story #${this.counter++}`, color: 'white' }).save();
    },

    /*
     * Update card's title
     */
    updateTitle(id, title) {
      this.get('store').findRecord('card', id).then((card) => {
        card.set('title', title);
        card.save();
      });
    },

    /*
     * Update card's color
     */
    updateColor(id, color) {
      this.get('store').findRecord('card', id).then((card) => {
        card.set('color', color);
        card.save();
      });
    },

    /*
     * Remove card
     */
    removeCard(id) {
      this.get('store').findRecord('card', id).then((card) => {
        card.destroyRecord();
      });
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
    $(document).ready(this.onWindowResize);
  }

});

// TODO: drag and drop, and sortable
// TODO: color changer
// TODO: remove card
