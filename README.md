# Relations for Meteor Astronomy

The relations module is the client only module for Astronomy. It allows querying by fields residing in related collections. It may be used to perform sorting and filtering by related fields.

## Installation

```sh
$ meteor add usefulio:astronomy-relations
```

## Usage

```js
Users = new Mongo.Collection('users');

User = Astro.Class({
  name: 'User',
  collection: Users,
  fields: {
    name: 'string'
  }
});

Posts = new Mongo.Collection('posts');

Post = Astro.Class({
  name: 'Post',
  collection: Posts,
  fields: {
    title: 'string',
    userId: 'string',
  },
  loadRelations: {
    author: {
      local: 'userId',
      class: 'User'
    }
  }
});
```

In the example above, we have two classes. Each class has its own associated collection in which documents of given class are stored. Each post has its author which resides in the Users collection. In the `Post` class we've defined relation between classes. We can access a user object related with the given post using the `author` field name. Let's see it in action.

```js
Posts.find({}, {
  sort: {
    'author.name': 1
  }
});
```

As you can see, we can access the `author.name` field even if it's not in the `Posts` collection. Our module is doing joins automatically, you don't have to think about it at all.