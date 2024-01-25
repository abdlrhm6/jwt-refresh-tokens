import jwt from "jsonwebtoken"
export const verifyJwt = (req,res,next)=> {

    const header = req.headers.authorization
    if(!header) return res.json({msg :"you shall not pass"})
    const token = header.split(" ")[1]
    jwt.verify(token ,process.env.JWT_ACCESS_SECRET , (err,user)=>{
        if(err) return res.json({msg :"invalid token"})
        req.userid =user.id
        
        next()
    })
}