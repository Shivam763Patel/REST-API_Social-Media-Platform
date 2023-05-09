const jwt = require("jsonwebtoken")

module.exports = async (req,res,proceed) => {

   
    try

           {
            
               const token  = req.cookies.tokenall
                console.log(token)
        
               const jwt_secret=process.env.JWT_KEY || 'secret'
            //    console.log('jwt data',jwt_secret)
        
               const decoded = jwt.verify(token,jwt_secret)
            //    console.log('auth data',decoded)
    
               
               if(decoded.isActive === false) {
                 
                return  res.status(401).send({
                    message: 'Please Login with valid credentials !'
                   
                 })

                }
       
               else
               {
                req.userData = decoded
                proceed()

               }
           }
        
           catch(err)
           {
              
                   console.log(err)
                   return res.status(401).send({
                       message: "Please Login again !"
               })
               
               
           }



}