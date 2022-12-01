const User = require("../models/user");
const ErrorResponse = require('../utils/errorResponse');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { full_name: '', username: '', email: '', password: '', status: '' };

    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // incorrect username
    if (err.message === 'incorrect username') {
        errors.username = 'that username is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect';
    }

    //duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        errors.username = 'that username is already registered';
        return errors;
    }

    return errors;
}

exports.signup = async (req, res, next)=>{
    const { full_name, username, email, password, status } = req.body;

    try {
        const user = await User.create({ full_name, username, email, password, status });
        res.status(201).json({ 
            user: user._id,
            full_name: user.full_name,
            username: user.username,
            email: user.email,
            status: user.status
         });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
}


exports.signin = async (req, res, next)=>{
   const { email, password } = req.body;

    try {
        const user = await User.signin(email, password);
        const token = generateToken(user._id);
        res.status(200).json({ 
            user_id: user._id,
            status: user.status,
            user_token: user.token
         })
    }
    catch (err) {
        const errors = handleErrors(err);
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
    // .cookie('token', token, options )
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



// USESR PROFILE 
// exports.userProfile = async (req, res, next)=>{

//     const user = await User.findById(req.user.id);
//     res.status(200).json({
//         sucess: true,
//         user
//     });
// }


exports.getAllUser = async(req, res) => {
    try {
      const users = await User.find({}, "-__v")
      
      res.status(200).json({
        message: "Getting Data",
        data: users
      })
    } catch (error) {
      res.status(500).json({ message: "Server Error" })
    }
  };

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
