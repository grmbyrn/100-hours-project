const Post = require('../models/Post')

module.exports = {
    getProfile: async (req, res) => {
        try {
          const posts = await Post.find({ user: req.user.id });
          res.render("profile.ejs", { posts: posts, user: req.user });
        } catch (err) {
          console.log(err);
        }
    },
    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({createdAt: 'desc'}).lean()
            res.render('feed.ejs', {posts: posts})
        } catch (error) {
            console.log(err)
        }
    }
}