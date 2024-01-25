import mongoose from "mongoose";

const TokenSchema = mongoose.Schema({
    userid: {
        type: mongoose.Schema.ObjectId,
    },
    token: {
        type: String,
    },
}, { timestamps: true })

export const Token = mongoose.model("Token", TokenSchema)