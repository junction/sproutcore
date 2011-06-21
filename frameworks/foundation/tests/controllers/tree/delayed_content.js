// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// ==========================================================================

module("Test TreeController content", {
  setup: function() {
  },

  teardown: function() {
  }
});

test("SC.TreeController.content with delayed treeItemChildren", function() {
  var contentItems = [];

  var dummyTree = SC.TreeController.create({
    content: SC.Object.create({
      treeItemChildren: contentItems
    })
  });

  SC.run(function() {
    [1,2,3,4].forEach(function(i) {
      contentItems.pushObject(SC.Object.create({value: i}));
    });
  });

  equals(dummyTree.getPath('content.treeItemChildren.length'), 4, 'prereq - content.treeItemChildren should have 4 elements');

  var ao = dummyTree.get('arrangedObjects');
  equals(ao.get('length'),4, 'ao should have 4 values');
});
