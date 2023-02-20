const db = require("../models");
const User = db.user;

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

exports.findTechById = async (req, res) => {
    const id = req.params.id;
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
        where: { id: id }
    });
   
    if (!users) return;
    res.send(users);
}