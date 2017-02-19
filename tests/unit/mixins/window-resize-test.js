import Ember from 'ember';
import WindowResizeMixin from 'xin-app/mixins/window-resize';
import { module, test } from 'qunit';

module('Unit | Mixin | window resize');

// Replace this with your real tests.
test('it works', function(assert) {
  let WindowResizeObject = Ember.Object.extend(WindowResizeMixin);
  let subject = WindowResizeObject.create();
  assert.ok(subject);
});
