/**
 * Follow.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'SMP_API_LISTFOLLOWTABLE',

  attributes: {

    follow:{
      model:'Auth'
    },
    
    followby:{
     model:'Auth'

   },


  },

};

