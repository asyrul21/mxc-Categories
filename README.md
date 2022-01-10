# MXC Categories

[Buy me a Coffee](https://www.buymeacoffee.com/asyrulxpro)

A modular Mongo/mongoose - Express plugin that provides ready-made Controllers and API Routes to manage Categories.

# Pre-Requisites

Your app must support the following infrastructure:

1. Mongo/Mongoose
2. NodeJS/Express
3. jwt/jsonwebtoken (only if you plan to use the OOTB API Routes)
4. Morgan
5. dotenv
6. [mxUserAuthRoles](https://www.npmjs.com/package/mxuserauthroles) authentication library to provide out of the box Auth middlewares and user-role management API's. If you wish to implement your own routes, feel free to exclude this from your dependency list.
7. Mock-mongoose for testing

```bash
npm install mxc-categories mxuserauthroles mongoose express jsonwebtoken bcryptjs morgan mock-mongoose
```
