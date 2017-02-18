import Ember from 'ember';
import DocumentClickMixin from 'xin-app/mixins/document-click';
import { module, test } from 'qunit';

module('Unit | Mixin | document click');

// Replace this with your real tests.
test('it works', function(assert) {
  let DocumentClickObject = Ember.Object.extend(DocumentClickMixin);
  let subject = DocumentClickObject.create();
  assert.ok(subject);
});
