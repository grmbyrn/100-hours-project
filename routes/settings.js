const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const commentsController = require('../controllers/comments')
const settingsController = require('../controllers/settings')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/', settingsController.getSettings)

router.post('/createProfilePhoto', upload.single('file'), settingsController.createProfilePhoto)

module.exports = router