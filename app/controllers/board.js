import Ember from 'ember';
import WindowResizeMixin from '../mixins/window-resize';

export default Ember.Controller.extend(WindowResizeMixin, {
  backlog: [],
  inProgress: [],
  done: [],
  actions: {
    /*
     * Create new card and persist to the store.
     */
    newCard() {
      var order = this.get('backlog').get('length');
      var createdCard = this.get('store').createRecord('card', {
        title: 'Story #' + (order + 1),
        order: order
      });
      createdCard.save();
      this.get('backlog').pushObject(createdCard);
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

    reorderCards({ 'backlog': backlog, 'in-progress': inProgress, 'done': done }) {
      if (backlog) {
        this.set('backlog', []);
        backlog.forEach((cardId, index) => {
          this.get('store').findRecord('card', cardId).then(card => {
            card.set('status', 'backlog');
            card.set('order', index);
            card.save();
            this.get('backlog').pushObject(card);
          });
        });
      }

      if (inProgress) {
        this.set('inProgress', []);
        inProgress.forEach((cardId, index) => {
          this.get('store').findRecord('card', cardId).then(card => {
            card.set('status', 'in-progress');
            card.set('order', index);
            card.save();
            this.get('inProgress').pushObject(card);
          });
        });
      }

      if (done) {
        this.set('done', []);
        done.forEach((cardId, index) => {
          this.get('store').findRecord('card', cardId).then(card => {
            card.set('status', 'done');
            card.set('order', index);
            card.save();
            this.get('done').pushObject(card);
          });
        });
      }
    },

    removeCard(id) {
      this.get('store').findRecord('card', id).then(card => {
        let status = card.get('status');
        this.get(status === 'in-progress' ? 'inProgress' : status).removeObject(card);
        card.destroyRecord();
      });
    },

    clear() {
      localStorage.clear();
      this.set('backlog', []);
      this.set('inProgress', []);
      this.set('done', []);
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
    this.get('store').query('card', { status: 'backlog' }).then(cards => {
      this.set('backlog', cards.toArray());
    });

    this.get('store').query('card', { status: 'in-progress' }).then(cards => {
      this.set('inProgress', cards.toArray());
    });

    this.get('store').query('card', { status: 'done' }).then(cards => {
      this.set('done', cards.toArray());
    });

    document.title = 'Xin | Board';
    $(document).ready(() => { this.onWindowResize(); });
  }

});
