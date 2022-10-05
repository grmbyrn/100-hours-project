const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema({
      image: {
        type: String,
        require: true
    },
      cloudinaryId: {
        type: String,
        require: true
    },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
      createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Setting", SettingSchema)