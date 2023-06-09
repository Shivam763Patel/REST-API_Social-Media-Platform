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
  'post /auth/user/postList/:id': 'PostController.likepost',

  //User: follow user
  'post /auth/user/follow/:id': 'FollowController.followuser',

  //User: Comment on post
  'post /auth/user/post/comment/:id': 'CommentController.userComment',

  //User: View other user profile
  'get /auth/user/profile/:id':'UserController.userpostListNew',

  //User: Logout
  'get /auth/user/logout': 'UserController.logout',

  //Admin: View other user profile
  'get /auth/admin/profile/:id':'UserController.adminViewPost',

  //Admin: Register
  'post /auth/admin/register':'AdminController.register',

  //Admin: Login
  'post /auth/admin/login':'AdminController.login',

  //Admin: search user by text
  'post /auth/admin/viewuser':'AdminController.viewuser',

  //Admin: Logout
  'get /auth/admin/logout': 'AdminController.logout',
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
