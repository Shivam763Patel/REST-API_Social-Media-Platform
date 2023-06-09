/**
 * Auth.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt')

module.exports = {

  tableName: 'SMP_API_USER',

  attributes: {

    email:
    {
        type:'string',
        isEmail: true,
        required: true

    },

    username: {
      type:'string',
      unique: true,
      required: true

    },

  
    password:
    {
        type: 'string',
        minLength: 5,
        required: true

    },

    isActive:{

      type: 'boolean',
      defaultsTo: false
    },

    image:{

      type: 'string'
    },

    userid:{
      collection: 'post',
      via: 'userid'
    },
  
    likes:{
      collection: 'like',
      via: 'users'
    },

    follower:{ 
      collection: "Follow", 
      via: "follow" 
    },

    following:{ 
      collection: "Follow", 
      via: "followby" 
    },

    comment:{
      collection: 'Comment',
      via:'users'
    }


  },

  beforeCreate: function(values, cb) {
    // Hash password
    bcrypt.hash(values.password, 10, function(err, hash) {
        if (err) return cb(err);
    
        values.password = hash;
 
        cb();
    });
    
},


};

