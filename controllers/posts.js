const cloudinary = require('../middleware/cloudinary');
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Favourite = require('../models/Favourite')

module.exports = {
    getProfile: async (req, res) => {
        try {
          const posts = await Post.find({ user: req.user.id }).sort({createdAt: 'desc'}).lean();
          res.render("profile.ejs", { posts: posts, user: req.user });
        } catch (err) {
          console.log(err);
        }
    },
    getFeed: async (req, res) => {
        try {
            const posts = await Post.find().sort({createdAt: 'desc'}).lean()
            res.render('feed.ejs', {posts: posts, user: req.user})
        } catch (error) {
            console.log(err)
        }
    },
    getFavorites: async (req, res) => { 
        try {
          const posts = await Favourite.find({ user: req.user.id }).populate('post').sort({createdAt: 'desc'}).lean()
    
          //Sending post data from mongodb and user data to ejs template
          res.render("favourites.ejs", { posts: posts, user: req.user });
        } catch (error) {
          console.log(error);
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            const comments = await Comment.find({post: req.params.id}).sort({createdAt: 'desc'}).lean()
            res.render('post.ejs', {post: post, user: req.user, comments: comments})
        } catch (error) {
            console.log(error)
        }
    },
    createPost: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path)

            await Post.create({
                title: req.body.title,
                author: req.body.author,
                shouldIRead: req.body.shouldIRead,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                user: req.user.id,
                rating: req.body.rating
            })
            console.log('Post has been added')
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    },
    favouritePost: async (req, res) => {
        try {
            await Favourite.create({
                user: req.user.id,
                post: req.params.id
            })
            console.log('Favourite has been added!')
            res.redirect(`/post/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
    },
    likePost: async (req, res) => {
        try {
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: {likes: 1}
                }
            )
            console.log('Likes +1')
            res.redirect(`/post/${req.params.id}`)
        } catch (error) {
            console.log(error)
        }
    },
    deletePost: async (req, res) => {
        try {
            // Find post by id
            let post = await Post.findById({ _id: req.params.id })
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(post.cloudinaryId)
            // Delete post from db
            await Post.deleteOne({ _id: req.params.id })
            console.log('Deleted Post')
            res.redirect('/profile')
        } catch (error) {
            res.redirect('/profile')
        }
    }
}