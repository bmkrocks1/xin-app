import Ember from 'ember';
import DocumentClickMixin from '../mixins/document-click';

/* globals $ */
export default Ember.Controller.extend(DocumentClickMixin, {
  counter: 1,
  actions: {
    /*
     * Create new card and persist to localStorage.
     */
    newCard() {
      this.get('store').createRecord('card', { title: `Story #${this.counter++}` }).save();
    },

    /*
     * Update card's title
     */
    updateTitle(id, title) {
      this.get('store').findRecord('card', id).then((card) => {
        card.set('title', title);
        card.save();
      });
    }
  },

  onDocumentClick() {
    $('.card').removeClass('active');
    $('.card-actions').removeClass('active');
    $('.color-chooser').removeClass('open');
    $('#color-chooser-dropdown').hide();
  }
});

// TODO: window resize handler and updateScrollHeight
// TODO: drag and drop, and sortable
// TODO: color changer
// TODO: remove card
