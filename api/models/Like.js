/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    tableName: 'SMP_API_LIKETABLE',
  
    attributes: {
  
      users:{
  
        model:'Auth'
  
      }
  
     
  
    },
  
  };
  
  