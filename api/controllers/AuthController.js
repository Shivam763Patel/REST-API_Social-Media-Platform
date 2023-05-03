/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

module.exports = {
  register: async (req, res) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try {
      const userData = await Auth.find({ username: req.body.username });
        console.log('username is',userData)
      if (userData.length > 0) {
        res.status(200).send({
          message:
            "This username is already exists, please enter another one !",
        });
      } else {
        // Configuration
        cloudinary.config({
          cloud_name: "doymdnqtc",
          api_key: "836517598646324",
          api_secret: "odxoPKWLEarKoMzE5OQg3LmxjrU",
        });

        let addFile = await sails.upload(req.file("image"), {
          maxBytes: 100000000,
        }); // uploading file to sails local
        //Sync to the .temp folder
        console.log(addFile);
        const result = await cloudinary.uploader.upload(addFile[0].fd, {
          folder: "SMP",
          public_id: addFile[0].filename,
        });
        console.log("data file", result.url);

        await Auth.create({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          image: result.url,
        })
          .fetch()
          .then((result) => {
            res.status(200).send({
              success: true,
              data: result,
              message: "User has been registered !",
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

    console.log("normal pass", password);
    try {
      //Check for Authentication

      const userData = await Auth.findOne({ username: username });
      console.log("admin id", userData.id);
      console.log("admin id", userData.password);
      //Validate password
      bcrypt.compare(password, userData.password).then((result) => {
        if (result) {
          console.log("email id of user", userData.email);
          console.log("id of user", userData.id);

          //JWT Authentication
          const jwt_secret = process.env.JWT_KEY || "secret";
          const token = jwt.sign(
            {
              email: userData.email,
              authid: userData.id,
              isRole: userData.isRole,
            },

            jwt_secret,
            { expiresIn: "12h" }
          );

          //Store Token in cookie named tokenall
          const result = { email: userData.email };
          res.cookie("tokenall", token, { httpOnly: true }).status(200).send({
            success: true,
            data: result,
            message: "Logged in successfull !",
          });
        } else {
          return res.status(500).send({
            message: "Please, enter valid credential to login !",
          });
        }
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        message: "Something went wrong,please try again",
      });
    }
  },
};
