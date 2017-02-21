import Ember from 'ember';
import DocumentClickMixin from '../mixins/document-click';

export default Ember.Component.extend(DocumentClickMixin, {
  tagName: 'ul',
  classNames: ['card-colors', 'dropdown-menu'],
  colors: ['white', 'blue', 'green', 'yellow', 'red'],
  actions: {
    onColorSelect(color) {
      var thisDropDown = this.$();
      this.get('onColorSelect')(thisDropDown.parent().attr('id'), color);
    }
  },

  onDocumentClick() {
    this.$().closest('.card').removeClass('open-colors');
  }
});
