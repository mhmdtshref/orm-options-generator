# ORM Options Generator
We are converting query params that comes in the requests into a ORM options like sequelize options.

## Supported ORM libraries
- [Sequelize](https://sequelize.org)

## Installation
```
npm install orm-options-generator
```

## Usage
```typescript
import ORMOptionsGenerator from 'orm-options-generator';
import Post from './models';

const { sequelizeFindOptionsGenerator } = ORMOptionsGenerator;

index = (request, response) => {
    // Get query from request
    const { query } = request;

    // Generate FindOptions to be passed to sequelize model
    const options = sequelizeFindOptionsGenerator(query);
    
    // use options in findAll. Note: `Post` is a sequelize model
    Post.findAll(options)
    .then((posts) => {
        response.status(200).json(posts);
    })
}
```
## Options
Options should be an object contain these properties:
- [FIELD_NAME]:
  - could contain an object with properties:  `lt`, `lte`, `gt`, `gte`, `eq`
  - Could contain a value (to find equal)
  - Could contain an array of values (to select equal any of them)
- `and`/`or`
  - Could contain an object with properties. Each property should be an field name (and field name could have values as in [FIELD_NAME] point)
  - Could contain an array, each object should contain properties like previous point (field name, and field name should contain props like [FIELD_NAME])

## LICENSE
[MIT](./LICENSE)

# Developers
[Mohamed Sharif](https://github.com/mhmdtshref)