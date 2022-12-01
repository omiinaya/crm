const db = require("../models");
const { fn, col } = db.sequelize
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.findAll = async (req, res) => {
    try { 
        const users = await User.findAll({
            attributes: {
                exclude: [
                    'password', 
                    'email',
                    'username',
                    'createdAt',
                    'updatedAt',
                    'lastName',
                    'firstName'
                ],
                include: [
                    ["concat(firstName, ' ',  lastName)" , 'fullName']
                  ]
            },
        })
        res.send(users);
    }
    catch (err) { 
        console.log(err) 
    }
    
};