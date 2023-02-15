const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.findAll = async (req, res) => {
    try { 
        const users = await User.findAll({
            attributes: {
                exclude: [
                    'password', 
                    'username',
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