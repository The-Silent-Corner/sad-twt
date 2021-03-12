<p align="center">
<img src="https://github.com/jimmoua/express-template/actions/workflows/node.js.yml/badge.svg" alt="icon" />
</p>

# express-template

This is my personal template to clone for quick setup when developing with Express development. You may clone it with
the command below (assuming you have git)

## npm scripts
Script | Description
--- | ---
`npm run start` | starts the server
`npm run dev` | starts the nodemon development server
`npm run lint` | runs `eslint` (settings are found in `.eslintrc.json`
`npm run test` | runs unit tests
`npm run migrate` | creates the database table (see database section below)

# Database

The database used is SQL and ORM is [Sequelize](https://sequelize.org/). If some other variant of SQL is wished to be
used that isn't supported by Sequelize, you will have to set it up like so. This template provides setup for SQLite. The
database instance is defined in `db/index.js`. Please configure the database instance settings if you wish to use
something other than SQLite.

You may find it useful to create the database tables when developing. The script `npm run migrate` is useful for that.
All it does is runs the `createTables` function which is found in `db/databaseHelpers.js`

## Models

The models (tables) are defined in the `db/Models` directory.

```
db
└── Models
    ├── ExampleModel.js
    └── index.js
```

# Unit testing

[Jest](https://jestjs.io/) is used for unit testing. If some other unit testing framework is desired instead, please
set up yourself.

The `test` script puts Jest on silent mode and generates coverage reports by default.

# Linting

The lint configurations are found in the file `.eslintrc.json`. This is my personal flavor of the configuration, so feel
free to modify it to your needs.
