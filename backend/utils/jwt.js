import jwt from "jsonwebtoken"

export const generateAccessToken = (data) => {
    if (!data) return
    return jwt.sign({ id: data }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15s"
    })
}

export const generateRefreshToken = (data) => {
    if (!data) return

    return jwt.sign({ id: data }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d"
    })
}

