//Nếu chưa Login thì trở về trang đăng nhập
const jwt = require("jsonwebtoken");
let tokenHeaderKey = process.env.TOKEN_HEADER_KEY; 
let jwtSecretKey = process.env.JWT_SECRET_KEY; 
module.exports = (req, res, next) => {
    try { 
        const token = req.header(tokenHeaderKey); 
        console.log(token);
        const verified = jwt.verify(token, jwtSecretKey); 
        req.adminname = verified.adminname;
        if(verified){ 
            console.log("Authed")
            next();
        }else{ 
            // Access Denied 
            return res.status(401).send(error); 
        } 
    } catch (error) { 
        // Access Denied 
        return res.status(401).send(error); 
    } 
}