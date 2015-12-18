Astro.eventManager.on(
  'initDefinition', function onInitDefinitionRelations(schemaDefinition) {
    var Class = this;
    var schema = Class.schema;

    if (_.has(schemaDefinition, 'loadRelations')) {
      var loadRelations = {};

      _.each(schemaDefinition.loadRelations, function(loadRelation, fieldName) {
        loadRelations[fieldName] = loadRelation;

        if (!_.isObject(loadRelation)) {
          throw new TypeError(
            '["' + Class.getName() + '" class]["loadRelations" definition] ' +
            'The relation definition has to be an object'
          );
        }
        var Collection = Class.getCollection();
        if (!Collection) {
          throw new TypeError(
            '["' + Class.getName() + '" class]["loadRelations" definition] ' +
            'The "' + Class.getName() +
            '" class is not associated with any collection'
          );
        }
        if (!_.has(loadRelation, 'local')) {
          throw new TypeError(
            '["' + Class.getName() + '" class]["loadRelations" definition] ' +
            'The "local" property is mandatory'
          );
        }
        if (!Class.hasField(loadRelation.local)) {
          throw new TypeError(
            '["' + Class.getName() + '" class]["loadRelations" definition] ' +
            'The "' + loadRelation.local + '" field does not exist'
          );
        }
        if (!_.has(loadRelation, 'class')) {
          throw new TypeError(
            '["' + Class.getName() + '" class]["loadRelations" definition] ' +
            'The "class" property is mandatory'
          );
        }
        var RelatedClass = Astro.getClass(loadRelation.class);
        if (!RelatedClass) {
          throw new TypeError(
            '["' + Class.getName() + '" class]["loadRelations" definition] ' +
            'The "' + loadRelation.class + '" class does not exist'
          );
        }
        var RelatedCollection = RelatedClass.getCollection();
        if (!RelatedCollection) {
          throw new TypeError(
            '["' + Class.getName() + '" class]["loadRelations" definition] ' +
            'The "' + loadRelation.class +
            '" class is not associated with any collection'
          );
        }

        var fields = {};
        fields[fieldName] = {
          type: 'object',
          nested: loadRelation.class
        };
        Class.extend({
          fields: fields
        });

        defineRelation(
          Collection, RelatedCollection, fieldName, loadRelation.local
        );

        schema.loadRelations[fieldName] = loadRelation;
      });
    }
  }
);
