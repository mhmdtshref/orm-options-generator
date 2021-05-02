# ORM Options Generator
We are converting query params that comes in the requests into a ORM options like sequelize options.

## Supported ORM libraries
- [Sequelize](https://sequelize.org/)

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

## LICENSE
[MIT](./LICENSE)

# Developers
[Mohamed Sharif](https://github.com/mhmdtshref)