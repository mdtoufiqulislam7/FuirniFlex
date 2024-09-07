const jwt =  require("jsonwebtoken")


module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const verifiy = jwt.verify(token,'this is the jwt')
        // console.log(verifiy)
        next()
    } catch (error) {

         res.status(401).json({
            message:"token not valid"
        })
        
    }
}