Package.describe({
  name: 'usefulio:astronomy-relations',
  version: '1.0.0',
  summary: 'Relation for Meteor Astronomy',
  git: 'https://github.com/usefulio/meteor-astronomy-relations.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use('jagi:astronomy@1.2.7');
  api.use('underscore');
  api.use('tracker');

  api.imply('jagi:astronomy');

  // Module.
  api.addFiles([
    'lib/module/define_relation.js',
    'lib/module/init_class.js',
    'lib/module/init_definition.js'
  ], ['client']);
});
