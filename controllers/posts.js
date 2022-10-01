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
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            res.render('post.ejs', {post: post, user: req.user})
        } catch (error) {
            console.log(error)
        }
    },
    createPost: async (req, res) => {
        try {
            await Post.create({
                title: req.body.title,
                caption: req.body.caption,
                user: req.user.id
            })
            console.log('Post has been added')
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }
}