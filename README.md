Stock Portfolio App
===
This is web stock portfolio app running on an Express server and using mongoDB for storage. Data provided by [IEX Cloud](https://iexcloud.io/docs/api/)

**Additional technologies:**
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) for authorization
- [bcrypt](https://www.npmjs.com/package/bcrypt) for password encryption
- [EJS](https://www.npmjs.com/package/ejs) for templating
- [Mongoosejs](https://mongoosejs.com/) for mongoDB document modeling

How to use
---
1. Fork(optional) and clone this reposiroty
2. Run `npm start` or `node app.js`
3. In your browser, open `http://localhost:3000/`

\* Database connection can be slow

\* Database is cleared while under active development or when full

Sources of Errors and Needed Improvements
---
`src/mongodb.js`: What happens when we can't connect to database? How can this catch statement be more useful?
