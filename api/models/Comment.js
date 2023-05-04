/**
 * Comment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'SMP_API_COMMENTTABLE',
  attributes: {


    users: {
        model: "Auth"
    },

    post: {
        model: "Post"
    },
    
    comment: {
        type: "string",
        required: true,
    },

  },

};

