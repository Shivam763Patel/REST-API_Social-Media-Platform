/**
 * CommentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    userComment: async function (req, res) {
        const userid = req.params.id
            
        console.log("user id",userid)

        const { postid, caption } = req.body;

        const isPost = await Post.findOne({ id: postid});
        if (!isPost) {
            return res.status(200).json({
                message: "Post not Found",
            });
        }
        const commentData = await Comment.create({
    
            users: userid,
            post: postid,
            comment: caption,
        })
        .fetch();

        return res.status(200).json({
            message: "Comment data on post",
            comment: commentData,
        });
    },

};

