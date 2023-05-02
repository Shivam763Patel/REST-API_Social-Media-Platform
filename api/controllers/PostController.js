/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const cloudinary = require("cloudinary").v2;

module.exports = {
  
    createPost:  async (req,res) => {

        const id = req.params.id
    
            try{
                
                // Configuration 
                cloudinary.config({
                cloud_name: "doymdnqtc",
                api_key: "836517598646324",
                api_secret: "odxoPKWLEarKoMzE5OQg3LmxjrU"
                });
    
              
                let addFile = await sails.upload(req.file('image'), { maxBytes: 100000000 }); // uploading file to sails local
                //Sync to the .temp folder
                console.log(addFile);
                const result = await cloudinary.uploader.upload(addFile[0].fd, { folder: "SMP/USER POST", public_id: addFile[0].filename})       
                console.log('data file',result.url)
    
             
                    Post.create(
                    {
                        userid: id,
                        description: req.body.description,
                        image: result.url,
    
                       
                    })
                    .fetch()
                    .then(result => {
                        console.log('data of post',result)
                        res.status(200).send( {
        
        
                            success: true,
                            data: result,
                            message: 'Posted successfully !'
                        })
        
        
                    })
    
            }
        
            catch(err){
                console.log(err);
                res.status(422).send({
        
        
                message: 'Something went wrong,please try again !'
        
        
              })
            }
         },

        userpostList : async (req,res) => {
         
        try{
 
            
            const { page, limit } = req.query
    
    
            if(page<=1)
            {
                skip=0
            }
            else
            {
                skip= (page-1)*limit
                console.log('value skip',skip)
            }
                const result=await Post.find()
                .skip(skip)
                .limit(limit)
                .select(['description' ,'image'])
                .sort([
                    { createdAt: 'DESC' }
                  ])
                .then(result =>    
                    res.status(200).send( {
        
                    success: true,
                    data: result,
                    message: 'Successfully, fetched user post !'
                })
                )
            
        }
          catch(error){
            console.log(error);
            res.status(500).send({
    
    
            message: 'Something went wrong,please try again'
    
    
          })
        }
            
        },



    
};

