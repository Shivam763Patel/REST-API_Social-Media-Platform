/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  
    register: async (req, res) => {

        const username = req.body.username;
        const password = req.body.password;
    
        try {
          const userData = await Admin.find({ username: req.body.username });
            console.log('username is',userData)
          if (userData.length > 0) {
            res.status(200).send({
              message:
                "This username is already exists, please enter another one !",
            });
          } else {
            // // Configuration
            // cloudinary.config({
            //   cloud_name: "doymdnqtc",
            //   api_key: "836517598646324",
            //   api_secret: "odxoPKWLEarKoMzE5OQg3LmxjrU",
            // });
    
            // let addFile = await sails.upload(req.file("image"), {
            //   maxBytes: 100000000,
            // }); // uploading file to sails local
            // //Sync to the .temp folder
            // console.log(addFile);
            // const result = await cloudinary.uploader.upload(addFile[0].fd, {
            //   folder: "SMP",
            //   public_id: addFile[0].filename,
            // });
            // console.log("data file", result.url);
    
            await Admin.create({
       
              username: req.body.username,
              password: req.body.password,
        
            })
              .fetch()
              .then((result) => {
                res.status(200).send({
                  success: true,
                  data: result,
                  message: "Admin has been registered !",
                });
              });
          }
        } catch (err) {
          console.log(err);
          res.status(500).send({
            message: "Something went wrong,please try again",
          });
        }
      },


      login: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
       
        console.log("normal username", username);
        
        console.log("normal pass", password);
        try {
          //Check for Authentication
          const userData = await Admin.findOne({ username: username })
          console.log("admin data new",userData)
          console.log("admin data new",userData.password)


          bcrypt.compare(password, userData.password)
          .then(async (result) => {
            if (result) {
              console.log("email id of user", userData.username);
              console.log("id of user", userData.id);
                
              //JWT Authentication
              const jwt_secret = process.env.JWT_KEY || "secret";
              
              const token = jwt.sign(
                {
                    
                 
                  isAdmin: userData.isAdmin,
                },
            
                jwt_secret,
                { 
                    expiresIn: "12h" 
                },
                
       
              );
        
              console.log("Admin data",userData)
            
             //Store Token in cookie named tokenall
            res.cookie("tokenall", token, { httpOnly: true })
       
                return res.status(200).send({
                  success: true,
                  data: result,
                  message: "Logged in successfull !",
                });
              
            }
             else {
              return res.status(500).send({
                message: "Please, enter valid credential to login !",
              });
            }
          });
        } catch (error) {
          console.log(error);
    
          res.status(500).send({
            message: "Something went wrong, please try again",
          });
        }
      },

      //Admin: Search user by text 
    viewuser : async(req,res) => {
    var  user_data
    try{

        const { page = 1, limit = 10 } = req.query


        let  user_data
        let skip

        if(page<=1)
        {
            skip=0
        }
        else
        {
            skip= (page-1)*limit
        }
       
           const result = await Auth.find({ username: req.body.search.text.trim() })
           .select(['username', 'image', 'isActive'])
           .skip(skip)
           .limit(1)
      
            console.log("user data for admnin",result)
     
        res.status(200).send
        (
            {
                message: 'Successfull, User details are',
                data: result
            }
        )

    }
      catch(error)
    {
        res.status(500).json(error)

    }
},


logout: async function (req, res) {
    try {
        res.clearCookie('tokenall')
        return res.status(200).json({
            message: 'Successfully, logged out'
        })
    }
    catch (error) {
        return res.status(500).json({
            error: error
        })
    }
  },

};

