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
router.post('/login', async (req, res) => {
    let {email, password} = req.body;

    try {
        let userLogin = await UserModel.findOne({
            where:{email:email},
        });
        if (userLogin) {
            let passwordComparison = await bcrypt.compare(password, userLogin.password);
            
            if(passwordComparison) {
                let token = jwt.sign(
                    {id: userLogin.id},
                    process.env.JWT_SECRET,
                    {expiresIn: 60*60*24}
                )
                
                res.status(200).json({
                    user: userLogin,
                    message: "You have been successfully logged in.",
                    token
                });
            }else {
                res.status(401).json({
                    message: "Incorrect email or password"
                })
            }
        }else {
            res.status(401).json({
                message: "Incorrect email or password"
            });
        }
    }catch (err){
        res.status(500).json({
            message: "Failed to login"
        })
    }
});








 module.exports = router;