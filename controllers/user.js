const User = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');


exports.signup = async (req, res, next)=>{

    const {email} = req.body;
    const userExist = await User.findOne({email});
    
    // if (userExist){
      
    //  return  next(new ErrorResponse('E-mail already exists', 400))
    // }

    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        })
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
   
}


exports.signin = async (req, res, next)=>{
    const { email, password } = req.body;

    try {
        const user = await User.signin(email, password);
        const token = generateToken(user._id);
        res.status(200).json({ 
            user_id: user._id,
            role: user.role,
            user_token: token
         })
    }
    catch (err) {
        const errors = ErrorResponse(err);
        res.status(400).json({ errors });
    }
}


const generateToken = async (user, statusCode, res) =>{

    const token = await user.jwtGenerateToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.EXPIRE_TOKEN)
    };

    res
    .status(statusCode)
    .cookie('token', token, options )
    .json({success: true, token})
}


//LOG OUT USER
exports.logout = (req, res, next)=>{
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "Logged out"
    })
}




exports.singleUser = async (req, res, next)=>{

    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            sucess: true,
            user
        })
        
    } catch (error) {
        next(error)
        
    }
   
}
