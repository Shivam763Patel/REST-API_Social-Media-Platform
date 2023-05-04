const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

module.exports = {
  editUserProfile: async (req, res) => {
    console.log("profile data");
    try {
      // Configuration
      cloudinary.config({
        cloud_name: "doymdnqtc",
        api_key: "836517598646324",
        api_secret: "odxoPKWLEarKoMzE5OQg3LmxjrU",
      });

      let file = req.file("image");

      let addFile = await sails.upload(file, { maxBytes: 100000000 }); // uploading file to sails local
      //Sync to the .temp folder
      console.log(addFile);
      const result = await cloudinary.uploader.upload(addFile[0].fd, {
        folder: "SMP",
        public_id: addFile[0].filename,
      });
      console.log("data file", result.url);

      const id = req.params.id;
      console.log("Updated id", id);

      await Auth.update(
        {
          id: id,
        },
        {
          image: result.url,
        }
      )
        .fetch()
        .then((result) => {
          res.status(200).send({
            success: true,
            data: result,
            message: "User profile has been updated !",
          });
        });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: "Something went wrong,please try again",
      });
    }
  },

changePassword: async (req, res) => {
    const email = req.body.email

        console.log('user email new',email)
    await Auth.findOne({ email: email })
    .then(result => {
        const id = req.params.id
        console.log('user id data..',id)
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword

if (password === confirmpassword)
{
    bcrypt.hash(confirmpassword, 10, async (error,result) => {

        if (error)
        {
            console.log("Something went wrong, please try again !");
        }
        else 
        {
            Auth.updateOne({ id: id }, { password: result })
                .then(result => {
                    res.status(200).send({
                        success: true,
                        data: result,
                        message: "Password updated successfully !",
                      });
              
                })
        }
    })
}

})

.catch(error)
{
    console.log(err);
    res.status(500).send({
      message: "Something went wrong,please try again",
    });
}
},


userpostListNew: async(req,res) => {

  const id = req.params.id
  console.log('user id data..',id)
try{
  const { page, limit } = req.query

    await Auth.find({id: id})
    .select('username').populate('userid')
    
    .then(result=> {

    res.status(200).send({
      success: true,
      User: result,
      message: "User with post details !",
    });

  })

}
catch (err) {
  console.log(err);
  res.status(500).send({
    message: "Something went wrong,please try again",
  });
}
},




};
