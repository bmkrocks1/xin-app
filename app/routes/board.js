import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      backlog: this.get('store').query('card', { status: 'backlog' }),
      inProgress: this.get('store').query('card', { status: 'in-progress' }),
      done: this.get('store').query('card', { status: 'done' })
    });
  }
});
