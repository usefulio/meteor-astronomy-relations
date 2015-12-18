defineRelation = function(Collection, RelatedCollection, fieldName, local) {
  Collection._computations = Collection._computations || {};
  var comps = Collection._computations[fieldName] = {};

  var stop = function(doc) {
    if (comps[doc._id]) {
      comps[doc._id].stop();
    }
  };

  var update = function(doc) {
    var setModifier = {};

    setModifier[fieldName] = doc[local] ?
      RelatedCollection.findOne(doc[local]) : undefined;

    Collection._collection.update(doc._id, {
      $set: setModifier
    });
  };

  Collection.find().observe({
    added: function(newDoc) {
      stop(newDoc);
      comps[newDoc._id] = Tracker.autorun(function() {
        update(newDoc);
      });
    },
    changed: function(newDoc, oldDoc) {
      if (newDoc[local] !== oldDoc[local]) {
        stop(oldDoc);
        comps[newDoc._id] = Tracker.autorun(function() {
          update(newDoc);
        });
      }
    },
    removed: function(oldDoc) {
      stop(oldDoc);
    }
  });
};