import Ember from 'ember';
import DocumentClickMixin from '../mixins/document-click';

export default Ember.Component.extend(DocumentClickMixin, {
  tagName: 'ul',
  classNames: ['card-colors', 'dropdown-menu'],
  colors: ['white', 'blue', 'green', 'yellow', 'red'],
  actions: {
    onColorSelect(color) {
      /* INFO */ console.info('select color -', color);
    }
  },

  /*
   * TODO: fix magic numbers
   */
  didRender() {
    let thisDropDown = this.$(),
        offset = thisDropDown.offset(),
        top = offset.top + 18,
        left;

    if (thisDropDown.attr('data-placement') === 'left') {
      thisDropDown.addClass('placement-left');
      // TODO: compute left
    }
    else {
      left = offset.left + thisDropDown.parent().width() - 25;
    }

    thisDropDown.css({ top: top + 'px', left: left + 'px' });
  },

  onDocumentClick() {
    this.$().closest('.card').removeClass('open-colors');
  }
});
