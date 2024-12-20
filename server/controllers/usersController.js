const users = require('../models/userModel')
const bcrypt = require('bcryptjs');

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const usernameCheck = await users.findOne({ username })
        if (usernameCheck) return res.json({ msg: "Username already used", status: false })
        const emailCheck = await users.findOne({ email })
        if (emailCheck) return res.json({ msg: "Email already used", status: false })
        const hashedPassword = await bcrypt.hash(password, 10);
        const usertype='employee'
        var user = await users.create({
            username, email, password: hashedPassword, usertype
        })
        user = user.toObject()
        delete user.password
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
}


module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        var user = await users.findOne({ username })
        
        
        if (!user)
            return res.json({ msg: "Incorrect username or password", status: false })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect username or password", status: false })
        user = user.toObject()
        delete user.password
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
}


module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id
        const avatarImage = req.body.image
        const userData = await users.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        })
        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })

    } catch (ex) {
        next(ex)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const alluser = await users.find({ _id: { $ne: req.params.id } }).select([
            "email","username","avatarImage","_id",
        ])
        return res.json(alluser)

    } catch (ex) {
        next(ex)
    }
}