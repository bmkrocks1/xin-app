import DS from 'ember-data';

var Card = DS.Model.extend({
  title: DS.attr('string'),
  color: DS.attr('string', { defaultValue: 'white' }),
  status: DS.attr('string', { defaultValue: 'backlog' }),
  order: DS.attr('number')
});

export default Card;
