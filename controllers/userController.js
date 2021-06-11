const {UniqueConstraintError} = require('sequelize');
const router = require('express').Router();
const {UserModel} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



/**********************
 * USER - SIGNUP
 ****************/
router.post('/signup', async (req,res) => {
    const {firstName, lastName, email, password} = req.body;

    try {
        const newUser = await UserModel.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password,13)
        })
    

    const token = jwt.sign(
        {id: newUser.id},
        process.env.JWT_SECRET,
        {expiresIn: 60*60*24}
    )

    res.status(201).json({
        message: "User has been registered.",
        user: newUser,
        token
    })

} catch (error) {
    if (error instanceof UniqueConstraintError){
        res.status(409).json({
            message: `That email is already in use.`
        });
    }else {
        res.status(500).json({
            error: `Failed to register user: ${error}`
        })
    }
}
})







 /*****************
 * USER - LOGIN
 ****************/
// router.post('/login', function(req,res){
//     User.findOne({
//         where: {
//             email: req.body.email
//         }
//     })

//     .then(user => {
//         if(user){

//             bcrypt.compare(req.body.password, user.password, function(err,matches) {

//                 if(matches){
//                     let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

//                     res.status(200).json({
//                         user: user,
//                         message: "User is logged in.",
//                         sessionToken: token
//                     });
//                 } else {
//                     res.status(502).send({error: "Login failed" });
//                 }
//             });
//         } else {
//             res.status(500).json({error: 'User does not exist.'})
//         }
//     })
//     .catch(err => res.status(500).json({error :err}))

// });








 module.exports = router;