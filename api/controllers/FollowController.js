/**
 * FollowController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {

    followuser: async function (req, res) {
        const userid = req.params.id
            
        console.log("user id",userid)

        const { id } = req.body;

        const isUser = await Auth.findOne(id);
        if (!isUser) {
            return res.status(500).json({
                message: "User not Found",
            });
        }

        if (userid == id) {
            return res.status(200).json({
                message: "You can not follow yourself",
            });
        }

        const isFrd = await Follow.findOne({ follow: id, followby: userid });
        console.log('reult of follow',isFrd)
        
        if (isFrd) {
            await Follow.destroyOne({ follow: id, followby: userid });
            return res.status(200).json({
                message: `unfollowed ${id}`,
            });
        }

        const data = await Follow.create({
         
            follow: id,
            followby: userid,
        }).fetch();

        return res.status(200).json({
            message: `${id} followed by You`,
            userid: userid,
            follow: data,
        });
    },
};

