/**
 * Post.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  tableName: 'SMP_API_POST',

  attributes: {

    userid:{

      model:'Auth'

    },

    image:{

      type: 'string'
    },

    description:{

      type: 'string'

    },

  

  },

};

