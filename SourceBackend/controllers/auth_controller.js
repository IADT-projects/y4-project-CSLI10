

const loginRequired = (req, res, next) => {
    if(req.user){
        next();
    }

    res.status(401).json({
        msg: 'Unauthorized user!!'
    })
};

module.exports = {
    loginRequired
};