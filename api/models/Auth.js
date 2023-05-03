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

    image:{

      type: 'string'
    },

    userid:{
      collection: 'post',
      via: 'userid'
    },
    
    isRole:{
      type: 'boolean',
      defaultsTo: false
    },

    likes:{
      collection: 'like',
      via: 'users'
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

