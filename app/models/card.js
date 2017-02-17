import DS from 'ember-data';

var Card = DS.Model.extend({
  title: DS.attr('string'),
  color: DS.attr()
});

export default Card;
