const User = require("../models/user");

exports.create = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    const user = new User({
        Username: req.body.Username,
        Password: req.body.Password
    });

    return new Promise((resolve, reject) => {
        User.create(user, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => res.status(500).send({
            message: error.message
        }));
}

exports.findOne = (req, res) => {
    return new Promise((resolve, reject) => {
        User.findById(req.params.username, req.params.password, (err, data) => {
            if(err){
                reject(err);
            }
            resolve(data);
        });
    }).then((data) => res.send(data),
        (error) => {
            if(error.kind === "not_found") {
                res.status(404).send({
                    message: 'User not found with username: ' + req.params.username + ', password: ' + req.params.password
                })
            } else {
                res.status(500).send({
                    message: error.message
                })
            }
        });
};
