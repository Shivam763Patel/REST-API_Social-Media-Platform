/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  AuthController: {

    '*': 'isStatus',
    'register': true,
    'login': true

  },

  UserController:{

    'editUserProfile': 'isStatus',
    'changePassword': 'isStatus',
    'logout':'isStatus'
  },

  PostController:{
    'userpostList':'isStatus',
    'userpostListNew':'isStatus',
    'likepost':'isStatus',
    'createPost':'isStatus'

  },


  FollowController:{

    'followuser':'isStatus'

  },

  CommentController:{

    'userComment':'isStatus'

  },

  AdminController: {

    '*': 'isAdmin',
    'register': true,
    'login': true

  },

  AdminController:{

    'viewuser': 'isAdmin'
  }



};
