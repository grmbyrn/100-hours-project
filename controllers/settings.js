const cloudinary = require('../middleware/cloudinary');
const Setting = require('../models/Setting')

module.exports = {
    getSettings: async (req, res) => {
        try {
            res.render('settings.ejs')
        } catch (error) {
            console.log(error)
        }
    },
    createProfilePhoto: async (req, res) => {
        try {
            const result = await cloudinary.uploader.upload(req.file.path)

            await Setting.create({
                image: result.secure_url,
                cloudinaryId: result.public_id,
            })
            console.log('Profile picture has been set')
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }
}
