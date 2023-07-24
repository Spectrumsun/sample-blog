# bit-backend

A simple API in Javascript, Node, express and MongoDB

# View App
  * Host App Backend  https://blog-api-8yad.onrender.com/api/v1/

# Technologies Used
  * MongoDb
  * Express
  * Javascript
  * NodeJS
  * Prisma ORM

  #Endpoints
  User
  * POST:   Create user         -   https://blog-api-8yad.onrender.com/api/v1/user/signup
  * POST:   Sign in user        -   https://blog-api-8yad.onrender.com/api/v1/user/signin
  
  Post
  * GET:    List all post       -   https://blog-api-8yad.onrender.com/api/v1/post
  * GET:    Single post         -   https://blog-api-8yad.onrender.com/api/v1/post/:id
  * POST    Create a new post   -   https://blog-api-8yad.onrender.com/api/v1/post
  * Patch   Update a post       -   https://blog-api-8yad.onrender.com/api/v1/post/:id
  * Delete  Delete a post       -   https://blog-api-8yad.onrender.com/api/v1/post/:id

  Admin
  * GET     All post            -   https://blog-api-8yad.onrender.com/api/v1/admin/all-post
  * GET     Single post         -   https://blog-api-8yad.onrender.com/api/v1/admin/single-post/:id
  * PATCH   Update any  post    -   https://blog-api-8yad.onrender.com/api/v1/admin/update-post/:id
  * DELETE  Delete any post     -   https://blog-api-8yad.onrender.com/api/v1/admin/delete-post/:id
  * PATCH   Update user role    -   https://blog-api-8yad.onrender.com/api/v1/admin/update-role

# Run Locally
  * Download or clone the repo
  * Make sure you have the latest `node` and `npm` installed on your system
  * Open the terminal inside the root directory of the repo
  * Run `npm install` or `npm i` to install all dependencies
  * Make sure your MongoDB database is running 
  * Add the datebase information to the .env file
  * Run the migration with `npm run migration`
  * Run the seed with `npm run seed`
  * Run `npm start` to start the in development
  * Go to `127.0.0.1:6000/api/v1`


# Documentation
  Swagger:    -   https://blog-api-8yad.onrender.com/api-docs/