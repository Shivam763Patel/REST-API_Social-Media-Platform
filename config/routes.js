/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  'post /auth/user/register':'AuthController.register',
  'post /auth/user/login':'AuthController.login',

  //User Controller 
  //Edit User Profile
  'put /auth/user/profile/:id':'UserController.editUserProfile',

  //Change User Password
  'put /auth/user/changePassword/:id':'UserController.changePassword',

  //User: Create POST
  'post /auth/user/post/:id':'PostController.createPost',

  //User: List of post latest first with pagination
  'get /auth/user/allPost/':'PostController.userpostList',

  //User: List of post latest first with pagination in user 
  'get /auth/user/allPostUser/:id':'UserController.userpostListNew',

  //User: Post done
  'put /auth/user/postList/:id': 'PostController.likepost',

  //User: Comment on post
  'put /auth/user/post/comemnt': 'CommentController.userComment'
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
