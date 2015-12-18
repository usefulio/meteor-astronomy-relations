Astro.eventManager.on(
  'initClass', function onInitClassRelations() {
    var Class = this;
    var schema = Class.schema;

    schema.loadRelations = schema.loadRelations || {};
  }
);