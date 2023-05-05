const User = require('../models/user_schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
    let newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10)

    console.log(newUser);

    newUser.save((err, user) => {
        if(err){
            return res.status(400).json({
                msg: err
            });
        }
        else {
            user.password = undefined;
            return res.status(201).json((user));  
        }
    });
}

const login = (req, res) => {
    User.findOne({
        email: req.body.email
    })
    .then((user) => {
        if(!user || !user.comparePassword(req.body.password)){
            res.status(401).json({
                msg: 'Authentication failed. Inalid user or password.'
            })
        }
        else {
            let token = jwt.sign({
                email: user.email,
                name: user.name,
                _id: user._id
            }, process.env.APP_KEY);

            res.status(200).json({
                msg: 'All good',
                token: token,
                _id: user._id
            })
        }
    })
    .catch((err) => {
        throw err;
    })
}

const readOne = (req, res) => {

    let id = req.params.id;

    // connect to db and retrieve user with :id
    User.findById(id)
        .then((data) => {

            if(data){
                res.status(200).json(data);
            }
            else {
                res.status(404).json({
                    "message": `User with id: ${id} not found`
                });
            }
            
        })
        .catch((err) => {
            console.error(err);
            if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                res.status(500).json(err)
            }
            
            
        });


};

const updateData = (req, res) => {

    let id = req.params.id;
    let body = req.body;

    User.findByIdAndUpdate(id, body, {
        new: true
    })
        .then((data) => {

            if(data){
                res.status(201).json(data);
            }
            else {
                res.status(404).json({
                    "message": `Course with id: ${id} not found`
                });
            }
            
        })
        .catch((err) => {
            if(err.name === 'ValidationError'){
                console.error('Validation Error!!', err);
                res.status(422).json({
                    "msg": "Validation Error",
                    "error" : err.message 
                });
            }
            else if(err.name === 'CastError') {
                res.status(400).json({
                    "message": `Bad request, ${id} is not a valid id`
                });
            }
            else {
                console.error(err);
                res.status(500).json(err);
            }
        });


};


module.exports = {
    register,
    login,
    readOne,
    updateData
};


