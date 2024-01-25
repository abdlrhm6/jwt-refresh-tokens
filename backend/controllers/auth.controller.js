import { validateRegistrationBody, validateLoginBody } from "../utils/validation.js"
import { User } from "../models/user.model.js"
import { Token } from "../models/token.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js"


export const register = async (req, res) => {

    const { value, error } = validateRegistrationBody(req.body)
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.json({ errors: errorMessages, data: null });
    }

    const user = await User.findOne({ email: value.email })
    if (user) {
        return res.json({ errors: "This email is already exists", data: null });
    } else {
        const hashedPassword = await bcrypt.hash(value.password, 10)
        const newUser = await User.create({ ...value, password: hashedPassword })
        return res.status(200).json({ errors: null, data: "User created successfully" })

    }
}

export const login = async (req, res) => {
    const { value, error } = validateLoginBody(req.body)
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.json({ errors: errorMessages, data: null });
    }

    const user = await User.findOne({ email: value.email })
    if (!user) {
        return res.json({ errors: "This email does not exists", data: null });
    } else {
        const compareResult = await bcrypt.compare(value.password, user.password)
        if (!compareResult) {
            return res.json({ errors: "Invalid Password Try again", data: null });
        }

        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id)
        await Token.deleteOne({ userid: user.id })
        const { password, ...other } = user._doc

        await Token.create({ userid: user.id, token: refreshToken })
        return  res.status(200).cookie("token", accessToken, { maxAge: 1000 * 60 * 60 * 24 * 30 }).cookie("refresh-token", refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 }).json({ errors: null, user: { ...other } })

    }
}


export const refresh = async (req, res) => {

    const token = req.body.token
    if (!token) return res.status(403).json({ errors: "Unauthorized,please Login", data: null })
    const refreshtoken = await Token.findOne({ token })
    if (!refreshtoken) return res.status(403).json({ errors: "Not A valid token", data: null })

    jwt.verify(refreshtoken.token, process.env.JWT_REFRESH_SECRET, async (err, userid) => {
        if (err) console.log(err)
        const newAccessToken = generateAccessToken(userid.id)
        const newRefreshToken = generateRefreshToken(userid.id)
        await Token.deleteOne({ userid: userid.id })
        await Token.create({ userid: userid.id, token: newRefreshToken })
        return res.status(200).cookie("token", newAccessToken, { maxAge: 1000 * 60 * 60 * 24 * 30 }).cookie("refresh-token", newRefreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30 }).json({
            errors: null, 
                accessToken: newAccessToken,  
        })
    })
}

export const profile = async (req, res) => {
    const email = req.body.email
    const user = await User.findOneAndUpdate({ _id:req.userid}, {email})
    if(user) return res.status(200).json({success:true})
}