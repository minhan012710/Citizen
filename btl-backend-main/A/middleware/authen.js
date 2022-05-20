const jwt = require("jsonwebtoken");
const Admin = require('../models/admin');

const authentication = async (req,res,next) =>{
    const header = req.headers['authorization'];
    const token = header && header.split(" ")[1];
    try{
        const secretKey  = process.env.secrectkey;
        const decode = jwt.verify(token,secretKey)
        req.user = decode
        next();
        
    }catch(err){
        res.status(err.status || 401).send({message:"Token is not corret"})
    }

}

const checkPermission = async (req, res, next) => {
    const requester = req.body.requester || req.query.requester;
    if(requester){
        const admin = await Admin.findOne({ username: requester });
        if(admin && !admin.isLockedOut){
            next();
        }else{
            res.json({ message: "Bạn không có thẩm quyền", success: false });
        }
    }else{
        res.json({ message: "Bạn không có thẩm quyền", success: false });
    }
}

module.exports  = {authentication, checkPermission};